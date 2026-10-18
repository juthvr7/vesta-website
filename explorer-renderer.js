// A result viewer. Every shader below changes presentation, never generates data.
const vertex=`#version 300 es
precision highp float;
precision highp int;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
uniform mat4 uCamera,uModel;
uniform float uWater;
uniform int uPass;
out vec3 vPosition,vNormal;
void main(){vec3 p=aPosition;if(uPass==2)p.y=uWater;vPosition=p;
 vNormal=normalize(transpose(inverse(mat3(uModel)))*aNormal);
 gl_Position=uCamera*uModel*vec4(p,1.);}`;
const fragment=`#version 300 es
precision highp float;
precision highp int;
in vec3 vPosition,vNormal;
uniform int uPass,uTerrain,uNormals,uContours;
uniform float uClip,uLight,uLow,uHigh;
out vec4 color;
void main(){
 if(vPosition.x>uClip)discard;
 if(uPass==1){color=vec4(.56,.77,.65,.68);return;}
 if(uPass==2){color=vec4(.15,.43,.47,.75);return;}
 vec3 n=normalize(vNormal);if(!gl_FrontFacing)n=-n;
 vec3 light=normalize(vec3(cos(uLight),.8,sin(uLight)));
 float diffuse=max(dot(n,light),0.);float fill=max(dot(n,vec3(-.6,.5,.5)),0.);
 vec3 base=vec3(.61,.72,.62);
 float h=clamp((vPosition.y-uLow)/max(.001,uHigh-uLow),0.,1.);
 if(uTerrain==1){base=mix(vec3(.20,.40,.33),vec3(.71,.72,.51),smoothstep(0.,.65,h));base=mix(base,vec3(.89,.86,.71),smoothstep(.6,1.,h));}
 if(uNormals==1)base=n*.5+.5;
 float contour=1.;if(uTerrain==1&&uContours==1){float y=h*18.;float d=abs(fract(y+.5)-.5);contour=mix(.40,1.,smoothstep(0.,max(.005,fwidth(y)*1.4),d));}
 vec3 lit=base*(.32+.70*diffuse+.15*fill)*contour;
 color=vec4(pow(lit,vec3(.85)),1.);}`;
export class ResultRenderer{
 constructor(canvas){
  this.canvas=canvas;this.gl=canvas.getContext('webgl2',{alpha:false,antialias:true,preserveDrawingBuffer:true});
  if(!this.gl)throw Error('webgl2_unavailable');
  const gl=this.gl;
  const compile=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
  this.program=gl.createProgram();const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  gl.attachShader(this.program,vs);gl.attachShader(this.program,fs);gl.linkProgram(this.program);gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(this.program));
  this.uniforms={};for(const key of ['Camera','Model','Water','Pass','Terrain','Normals','Contours','Clip','Light','Low','High'])this.uniforms[key]=gl.getUniformLocation(this.program,'u'+key);
  this.buffers=[];this.count=0;this.edgeCount=0;
 }
 upload(mesh){
  const gl=this.gl;this.clearMesh();this.vao=gl.createVertexArray();gl.bindVertexArray(this.vao);
  const attr=(data,slot)=>{const b=gl.createBuffer();this.buffers.push(b);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);gl.enableVertexAttribArray(slot);gl.vertexAttribPointer(slot,3,gl.FLOAT,false,0,0);};
  attr(mesh.positions,0);attr(mesh.normals,1);
  this.triangles=gl.createBuffer();this.buffers.push(this.triangles);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangles);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);
  this.lines=gl.createBuffer();this.buffers.push(this.lines);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.lines);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.edges,gl.STATIC_DRAW);
  this.count=mesh.indices.length;this.edgeCount=mesh.edges.length;
  const plane={positions:new Float32Array([-1,0,-1,1,0,-1,-1,0,1,1,0,1]),normals:new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),indices:new Uint32Array([0,2,1,1,2,3])};
  this.waterVao=gl.createVertexArray();gl.bindVertexArray(this.waterVao);attr(plane.positions,0);attr(plane.normals,1);
  const b=gl.createBuffer();this.buffers.push(b);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,plane.indices,gl.STATIC_DRAW);
  gl.bindVertexArray(null);
 }
 draw(matrices,state){
  const gl=this.gl,ratio=Math.min(devicePixelRatio||1,2),box=this.canvas.getBoundingClientRect();
  const w=Math.max(1,Math.min(4096,Math.round(box.width*ratio))),h=Math.max(1,Math.min(4096,Math.round(box.height*ratio)));
  if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
  gl.viewport(0,0,w,h);gl.clearColor(.044,.077,.063,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  if(!this.count)return;
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.useProgram(this.program);
  const u=this.uniforms;gl.uniformMatrix4fv(u.Camera,false,matrices.subarray(0,16));gl.uniformMatrix4fv(u.Model,false,matrices.subarray(16));
  gl.uniform1i(u.Terrain,state.terrain?1:0);gl.uniform1i(u.Normals,state.normals?1:0);gl.uniform1i(u.Contours,state.contours?1:0);
  gl.uniform1f(u.Clip,state.clip);gl.uniform1f(u.Light,state.light);gl.uniform1f(u.Low,state.low);gl.uniform1f(u.High,state.high);
  gl.uniform1f(u.Water,state.low+(state.high-state.low)*state.water);
  gl.bindVertexArray(this.vao);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.triangles);gl.uniform1i(u.Pass,0);
  gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1,1);gl.drawElements(gl.TRIANGLES,this.count,gl.UNSIGNED_INT,0);gl.disable(gl.POLYGON_OFFSET_FILL);
  if(state.wire){gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.lines);gl.uniform1i(u.Pass,1);gl.drawElements(gl.LINES,this.edgeCount,gl.UNSIGNED_INT,0);gl.disable(gl.BLEND);}
  if(state.terrain&&state.water>0){gl.bindVertexArray(this.waterVao);gl.uniform1i(u.Pass,2);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_INT,0);gl.disable(gl.BLEND);}
  gl.bindVertexArray(null);
 }
 clearMesh(){const gl=this.gl;for(const b of this.buffers)gl.deleteBuffer(b);this.buffers=[];if(this.vao)gl.deleteVertexArray(this.vao);if(this.waterVao)gl.deleteVertexArray(this.waterVao);this.count=0;}
 destroy(){this.clearMesh();this.gl.deleteProgram(this.program);}
}
