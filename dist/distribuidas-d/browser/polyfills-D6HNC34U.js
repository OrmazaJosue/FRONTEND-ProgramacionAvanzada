var ie=globalThis;function Q(t){return(ie.__Zone_symbol_prefix||"__zone_symbol__")+t}function Tt(){let t=ie.performance;function e(x){t&&t.mark&&t.mark(x)}function c(x,r){t&&t.measure&&t.measure(x,r)}e("Zone");let Y=class Y{static assertZonePatched(){if(ie.Promise!==S.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let r=Y.current;for(;r.parent;)r=r.parent;return r}static get current(){return k.zone}static get currentTask(){return C}static __load_patch(r,i,s=!1){if(S.hasOwnProperty(r)){let b=ie[Q("forceDuplicateZoneCheck")]===!0;if(!s&&b)throw Error("Already loaded patch: "+r)}else if(!ie["__Zone_disable_"+r]){let b="Zone:"+r;e(b),S[r]=i(ie,Y,P),c(b,b)}}get parent(){return this._parent}get name(){return this._name}constructor(r,i){this._parent=r,this._name=i?i.name||"unnamed":"<root>",this._properties=i&&i.properties||{},this._zoneDelegate=new f(this,this._parent&&this._parent._zoneDelegate,i)}get(r){let i=this.getZoneWith(r);if(i)return i._properties[r]}getZoneWith(r){let i=this;for(;i;){if(i._properties.hasOwnProperty(r))return i;i=i._parent}return null}fork(r){if(!r)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,r)}wrap(r,i){if(typeof r!="function")throw new Error("Expecting function got: "+r);let s=this._zoneDelegate.intercept(this,r,i),b=this;return function(){return b.runGuarded(s,this,arguments,i)}}run(r,i,s,b){k={parent:k,zone:this};try{return this._zoneDelegate.invoke(this,r,i,s,b)}finally{k=k.parent}}runGuarded(r,i=null,s,b){k={parent:k,zone:this};try{try{return this._zoneDelegate.invoke(this,r,i,s,b)}catch($){if(this._zoneDelegate.handleError(this,$))throw $}}finally{k=k.parent}}runTask(r,i,s){if(r.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(r.zone||te).name+"; Execution: "+this.name+")");if(r.state===q&&(r.type===G||r.type===E))return;let b=r.state!=U;b&&r._transitionTo(U,d),r.runCount++;let $=C;C=r,k={parent:k,zone:this};try{r.type==E&&r.data&&!r.data.isPeriodic&&(r.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,r,i,s)}catch(L){if(this._zoneDelegate.handleError(this,L))throw L}}finally{r.state!==q&&r.state!==X&&(r.type==G||r.data&&r.data.isPeriodic?b&&r._transitionTo(d,U):(r.runCount=0,this._updateTaskCount(r,-1),b&&r._transitionTo(q,U,q))),k=k.parent,C=$}}scheduleTask(r){if(r.zone&&r.zone!==this){let s=this;for(;s;){if(s===r.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${r.zone.name}`);s=s.parent}}r._transitionTo(v,q);let i=[];r._zoneDelegates=i,r._zone=this;try{r=this._zoneDelegate.scheduleTask(this,r)}catch(s){throw r._transitionTo(X,v,q),this._zoneDelegate.handleError(this,s),s}return r._zoneDelegates===i&&this._updateTaskCount(r,1),r.state==v&&r._transitionTo(d,v),r}scheduleMicroTask(r,i,s,b){return this.scheduleTask(new _(z,r,i,s,b,void 0))}scheduleMacroTask(r,i,s,b,$){return this.scheduleTask(new _(E,r,i,s,b,$))}scheduleEventTask(r,i,s,b,$){return this.scheduleTask(new _(G,r,i,s,b,$))}cancelTask(r){if(r.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(r.zone||te).name+"; Execution: "+this.name+")");if(!(r.state!==d&&r.state!==U)){r._transitionTo(F,d,U);try{this._zoneDelegate.cancelTask(this,r)}catch(i){throw r._transitionTo(X,F),this._zoneDelegate.handleError(this,i),i}return this._updateTaskCount(r,-1),r._transitionTo(q,F),r.runCount=0,r}}_updateTaskCount(r,i){let s=r._zoneDelegates;i==-1&&(r._zoneDelegates=null);for(let b=0;b<s.length;b++)s[b]._updateTaskCount(r.type,i)}};Y.__symbol__=Q;let n=Y,a={name:"",onHasTask:(x,r,i,s)=>x.hasTask(i,s),onScheduleTask:(x,r,i,s)=>x.scheduleTask(i,s),onInvokeTask:(x,r,i,s,b,$)=>x.invokeTask(i,s,b,$),onCancelTask:(x,r,i,s)=>x.cancelTask(i,s)};class f{get zone(){return this._zone}constructor(r,i,s){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this._zone=r,this._parentDelegate=i,this._forkZS=s&&(s&&s.onFork?s:i._forkZS),this._forkDlgt=s&&(s.onFork?i:i._forkDlgt),this._forkCurrZone=s&&(s.onFork?this._zone:i._forkCurrZone),this._interceptZS=s&&(s.onIntercept?s:i._interceptZS),this._interceptDlgt=s&&(s.onIntercept?i:i._interceptDlgt),this._interceptCurrZone=s&&(s.onIntercept?this._zone:i._interceptCurrZone),this._invokeZS=s&&(s.onInvoke?s:i._invokeZS),this._invokeDlgt=s&&(s.onInvoke?i:i._invokeDlgt),this._invokeCurrZone=s&&(s.onInvoke?this._zone:i._invokeCurrZone),this._handleErrorZS=s&&(s.onHandleError?s:i._handleErrorZS),this._handleErrorDlgt=s&&(s.onHandleError?i:i._handleErrorDlgt),this._handleErrorCurrZone=s&&(s.onHandleError?this._zone:i._handleErrorCurrZone),this._scheduleTaskZS=s&&(s.onScheduleTask?s:i._scheduleTaskZS),this._scheduleTaskDlgt=s&&(s.onScheduleTask?i:i._scheduleTaskDlgt),this._scheduleTaskCurrZone=s&&(s.onScheduleTask?this._zone:i._scheduleTaskCurrZone),this._invokeTaskZS=s&&(s.onInvokeTask?s:i._invokeTaskZS),this._invokeTaskDlgt=s&&(s.onInvokeTask?i:i._invokeTaskDlgt),this._invokeTaskCurrZone=s&&(s.onInvokeTask?this._zone:i._invokeTaskCurrZone),this._cancelTaskZS=s&&(s.onCancelTask?s:i._cancelTaskZS),this._cancelTaskDlgt=s&&(s.onCancelTask?i:i._cancelTaskDlgt),this._cancelTaskCurrZone=s&&(s.onCancelTask?this._zone:i._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;let b=s&&s.onHasTask,$=i&&i._hasTaskZS;(b||$)&&(this._hasTaskZS=b?s:a,this._hasTaskDlgt=i,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=this._zone,s.onScheduleTask||(this._scheduleTaskZS=a,this._scheduleTaskDlgt=i,this._scheduleTaskCurrZone=this._zone),s.onInvokeTask||(this._invokeTaskZS=a,this._invokeTaskDlgt=i,this._invokeTaskCurrZone=this._zone),s.onCancelTask||(this._cancelTaskZS=a,this._cancelTaskDlgt=i,this._cancelTaskCurrZone=this._zone))}fork(r,i){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,r,i):new n(r,i)}intercept(r,i,s){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,r,i,s):i}invoke(r,i,s,b,$){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,r,i,s,b,$):i.apply(s,b)}handleError(r,i){return this._handleErrorZS?this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,r,i):!0}scheduleTask(r,i){let s=i;if(this._scheduleTaskZS)this._hasTaskZS&&s._zoneDelegates.push(this._hasTaskDlgtOwner),s=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,r,i),s||(s=i);else if(i.scheduleFn)i.scheduleFn(i);else if(i.type==z)V(i);else throw new Error("Task is missing scheduleFn.");return s}invokeTask(r,i,s,b){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,r,i,s,b):i.callback.apply(s,b)}cancelTask(r,i){let s;if(this._cancelTaskZS)s=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,r,i);else{if(!i.cancelFn)throw Error("Task is not cancelable");s=i.cancelFn(i)}return s}hasTask(r,i){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,r,i)}catch(s){this.handleError(r,s)}}_updateTaskCount(r,i){let s=this._taskCounts,b=s[r],$=s[r]=b+i;if($<0)throw new Error("More tasks executed then were scheduled.");if(b==0||$==0){let L={microTask:s.microTask>0,macroTask:s.macroTask>0,eventTask:s.eventTask>0,change:r};this.hasTask(this._zone,L)}}}class _{constructor(r,i,s,b,$,L){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=r,this.source=i,this.data=b,this.scheduleFn=$,this.cancelFn=L,!s)throw new Error("callback is not defined");this.callback=s;let de=this;r===G&&b&&b.useG?this.invoke=_.invokeTask:this.invoke=function(){return _.invokeTask.call(ie,de,this,arguments)}}static invokeTask(r,i,s){r||(r=this),J++;try{return r.runCount++,r.zone.runTask(r,i,s)}finally{J==1&&j(),J--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(q,v)}_transitionTo(r,i,s){if(this._state===i||this._state===s)this._state=r,r==q&&(this._zoneDelegates=null);else throw new Error(`${this.type} '${this.source}': can not transition to '${r}', expecting state '${i}'${s?" or '"+s+"'":""}, was '${this._state}'.`)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}let T=Q("setTimeout"),p=Q("Promise"),N=Q("then"),g=[],M=!1,w;function A(x){if(w||ie[p]&&(w=ie[p].resolve(0)),w){let r=w[N];r||(r=w.then),r.call(w,x)}else ie[T](x,0)}function V(x){J===0&&g.length===0&&A(j),x&&g.push(x)}function j(){if(!M){for(M=!0;g.length;){let x=g;g=[];for(let r=0;r<x.length;r++){let i=x[r];try{i.zone.runTask(i,null,null)}catch(s){P.onUnhandledError(s)}}}P.microtaskDrainDone(),M=!1}}let te={name:"NO ZONE"},q="notScheduled",v="scheduling",d="scheduled",U="running",F="canceling",X="unknown",z="microTask",E="macroTask",G="eventTask",S={},P={symbol:Q,currentZoneFrame:()=>k,onUnhandledError:W,microtaskDrainDone:W,scheduleMicroTask:V,showUncaughtError:()=>!n[Q("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:W,patchMethod:()=>W,bindArguments:()=>[],patchThen:()=>W,patchMacroTask:()=>W,patchEventPrototype:()=>W,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>W,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>W,wrapWithCurrentZone:()=>W,filterProperties:()=>[],attachOriginToPatched:()=>W,_redefineProperty:()=>W,patchCallbacks:()=>W,nativeScheduleMicroTask:A},k={parent:null,zone:new n(null,null)},C=null,J=0;function W(){}return c("Zone","Zone"),n}function gt(){let t=globalThis,e=t[Q("forceDuplicateZoneCheck")]===!0;if(t.Zone&&(e||typeof t.Zone.__symbol__!="function"))throw new Error("Zone already loaded.");return t.Zone??=Tt(),t.Zone}var ve=Object.getOwnPropertyDescriptor,xe=Object.defineProperty,Ze=Object.getPrototypeOf,Et=Object.create,mt=Array.prototype.slice,$e="addEventListener",He="removeEventListener",Me=Q($e),Le=Q(He),ce="true",ae="false",be=Q("");function Be(t,e){return Zone.current.wrap(t,e)}function Ue(t,e,c,n,a){return Zone.current.scheduleMacroTask(t,e,c,n,a)}var Z=Q,Ce=typeof window<"u",me=Ce?window:void 0,K=Ce&&me||globalThis,pt="removeAttribute";function ze(t,e){for(let c=t.length-1;c>=0;c--)typeof t[c]=="function"&&(t[c]=Be(t[c],e+"_"+c));return t}function yt(t,e){let c=t.constructor.name;for(let n=0;n<e.length;n++){let a=e[n],f=t[a];if(f){let _=ve(t,a);if(!tt(_))continue;t[a]=(T=>{let p=function(){return T.apply(this,ze(arguments,c+"."+a))};return ue(p,T),p})(f)}}}function tt(t){return t?t.writable===!1?!1:!(typeof t.get=="function"&&typeof t.set>"u"):!0}var nt=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Se=!("nw"in K)&&typeof K.process<"u"&&K.process.toString()==="[object process]",Ge=!Se&&!nt&&!!(Ce&&me.HTMLElement),rt=typeof K.process<"u"&&K.process.toString()==="[object process]"&&!nt&&!!(Ce&&me.HTMLElement),Ne={},Ke=function(t){if(t=t||K.event,!t)return;let e=Ne[t.type];e||(e=Ne[t.type]=Z("ON_PROPERTY"+t.type));let c=this||t.target||K,n=c[e],a;if(Ge&&c===me&&t.type==="error"){let f=t;a=n&&n.call(this,f.message,f.filename,f.lineno,f.colno,f.error),a===!0&&t.preventDefault()}else a=n&&n.apply(this,arguments),a!=null&&!a&&t.preventDefault();return a};function Je(t,e,c){let n=ve(t,e);if(!n&&c&&ve(c,e)&&(n={enumerable:!0,configurable:!0}),!n||!n.configurable)return;let a=Z("on"+e+"patched");if(t.hasOwnProperty(a)&&t[a])return;delete n.writable,delete n.value;let f=n.get,_=n.set,T=e.slice(2),p=Ne[T];p||(p=Ne[T]=Z("ON_PROPERTY"+T)),n.set=function(N){let g=this;if(!g&&t===K&&(g=K),!g)return;typeof g[p]=="function"&&g.removeEventListener(T,Ke),_&&_.call(g,null),g[p]=N,typeof N=="function"&&g.addEventListener(T,Ke,!1)},n.get=function(){let N=this;if(!N&&t===K&&(N=K),!N)return null;let g=N[p];if(g)return g;if(f){let M=f.call(this);if(M)return n.set.call(this,M),typeof N[pt]=="function"&&N.removeAttribute(e),M}return null},xe(t,e,n),t[a]=!0}function ot(t,e,c){if(e)for(let n=0;n<e.length;n++)Je(t,"on"+e[n],c);else{let n=[];for(let a in t)a.slice(0,2)=="on"&&n.push(a);for(let a=0;a<n.length;a++)Je(t,n[a],c)}}var re=Z("originalInstance");function ke(t){let e=K[t];if(!e)return;K[Z(t)]=e,K[t]=function(){let a=ze(arguments,t);switch(a.length){case 0:this[re]=new e;break;case 1:this[re]=new e(a[0]);break;case 2:this[re]=new e(a[0],a[1]);break;case 3:this[re]=new e(a[0],a[1],a[2]);break;case 4:this[re]=new e(a[0],a[1],a[2],a[3]);break;default:throw new Error("Arg list too long.")}},ue(K[t],e);let c=new e(function(){}),n;for(n in c)t==="XMLHttpRequest"&&n==="responseBlob"||function(a){typeof c[a]=="function"?K[t].prototype[a]=function(){return this[re][a].apply(this[re],arguments)}:xe(K[t].prototype,a,{set:function(f){typeof f=="function"?(this[re][a]=Be(f,t+"."+a),ue(this[re][a],f)):this[re][a]=f},get:function(){return this[re][a]}})}(n);for(n in e)n!=="prototype"&&e.hasOwnProperty(n)&&(K[t][n]=e[n])}function le(t,e,c){let n=t;for(;n&&!n.hasOwnProperty(e);)n=Ze(n);!n&&t[e]&&(n=t);let a=Z(e),f=null;if(n&&(!(f=n[a])||!n.hasOwnProperty(a))){f=n[a]=n[e];let _=n&&ve(n,e);if(tt(_)){let T=c(f,a,e);n[e]=function(){return T(this,arguments)},ue(n[e],f)}}return f}function kt(t,e,c){let n=null;function a(f){let _=f.data;return _.args[_.cbIdx]=function(){f.invoke.apply(this,arguments)},n.apply(_.target,_.args),f}n=le(t,e,f=>function(_,T){let p=c(_,T);return p.cbIdx>=0&&typeof T[p.cbIdx]=="function"?Ue(p.name,T[p.cbIdx],p,a):f.apply(_,T)})}function ue(t,e){t[Z("OriginalDelegate")]=e}var Qe=!1,Ae=!1;function vt(){try{let t=me.navigator.userAgent;if(t.indexOf("MSIE ")!==-1||t.indexOf("Trident/")!==-1)return!0}catch{}return!1}function bt(){if(Qe)return Ae;Qe=!0;try{let t=me.navigator.userAgent;(t.indexOf("MSIE ")!==-1||t.indexOf("Trident/")!==-1||t.indexOf("Edge/")!==-1)&&(Ae=!0)}catch{}return Ae}var Ee=!1;if(typeof window<"u")try{let t=Object.defineProperty({},"passive",{get:function(){Ee=!0}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{Ee=!1}var wt={useG:!0},ee={},st={},it=new RegExp("^"+be+"(\\w+)(true|false)$"),ct=Z("propagationStopped");function at(t,e){let c=(e?e(t):t)+ae,n=(e?e(t):t)+ce,a=be+c,f=be+n;ee[t]={},ee[t][ae]=a,ee[t][ce]=f}function Pt(t,e,c,n){let a=n&&n.add||$e,f=n&&n.rm||He,_=n&&n.listeners||"eventListeners",T=n&&n.rmAll||"removeAllListeners",p=Z(a),N="."+a+":",g="prependListener",M="."+g+":",w=function(v,d,U){if(v.isRemoved)return;let F=v.callback;typeof F=="object"&&F.handleEvent&&(v.callback=E=>F.handleEvent(E),v.originalDelegate=F);let X;try{v.invoke(v,d,[U])}catch(E){X=E}let z=v.options;if(z&&typeof z=="object"&&z.once){let E=v.originalDelegate?v.originalDelegate:v.callback;d[f].call(d,U.type,E,z)}return X};function A(v,d,U){if(d=d||t.event,!d)return;let F=v||d.target||t,X=F[ee[d.type][U?ce:ae]];if(X){let z=[];if(X.length===1){let E=w(X[0],F,d);E&&z.push(E)}else{let E=X.slice();for(let G=0;G<E.length&&!(d&&d[ct]===!0);G++){let S=w(E[G],F,d);S&&z.push(S)}}if(z.length===1)throw z[0];for(let E=0;E<z.length;E++){let G=z[E];e.nativeScheduleMicroTask(()=>{throw G})}}}let V=function(v){return A(this,v,!1)},j=function(v){return A(this,v,!0)};function te(v,d){if(!v)return!1;let U=!0;d&&d.useG!==void 0&&(U=d.useG);let F=d&&d.vh,X=!0;d&&d.chkDup!==void 0&&(X=d.chkDup);let z=!1;d&&d.rt!==void 0&&(z=d.rt);let E=v;for(;E&&!E.hasOwnProperty(a);)E=Ze(E);if(!E&&v[a]&&(E=v),!E||E[p])return!1;let G=d&&d.eventNameToString,S={},P=E[p]=E[a],k=E[Z(f)]=E[f],C=E[Z(_)]=E[_],J=E[Z(T)]=E[T],W;d&&d.prepend&&(W=E[Z(d.prepend)]=E[d.prepend]);function Y(o,u){return!Ee&&typeof o=="object"&&o?!!o.capture:!Ee||!u?o:typeof o=="boolean"?{capture:o,passive:!0}:o?typeof o=="object"&&o.passive!==!1?{...o,passive:!0}:o:{passive:!0}}let x=function(o){if(!S.isExisting)return P.call(S.target,S.eventName,S.capture?j:V,S.options)},r=function(o){if(!o.isRemoved){let u=ee[o.eventName],y;u&&(y=u[o.capture?ce:ae]);let R=y&&o.target[y];if(R){for(let m=0;m<R.length;m++)if(R[m]===o){R.splice(m,1),o.isRemoved=!0,o.removeAbortListener&&(o.removeAbortListener(),o.removeAbortListener=null),R.length===0&&(o.allRemoved=!0,o.target[y]=null);break}}}if(o.allRemoved)return k.call(o.target,o.eventName,o.capture?j:V,o.options)},i=function(o){return P.call(S.target,S.eventName,o.invoke,S.options)},s=function(o){return W.call(S.target,S.eventName,o.invoke,S.options)},b=function(o){return k.call(o.target,o.eventName,o.invoke,o.options)},$=U?x:i,L=U?r:b,de=function(o,u){let y=typeof u;return y==="function"&&o.callback===u||y==="object"&&o.originalDelegate===u},pe=d&&d.diff?d.diff:de,he=Zone[Z("UNPATCHED_EVENTS")],we=t[Z("PASSIVE_EVENTS")];function h(o){if(typeof o=="object"&&o!==null){let u={...o};return o.signal&&(u.signal=o.signal),u}return o}let l=function(o,u,y,R,m=!1,I=!1){return function(){let O=this||t,D=arguments[0];d&&d.transferEventName&&(D=d.transferEventName(D));let H=arguments[1];if(!H)return o.apply(this,arguments);if(Se&&D==="uncaughtException")return o.apply(this,arguments);let B=!1;if(typeof H!="function"){if(!H.handleEvent)return o.apply(this,arguments);B=!0}if(F&&!F(o,H,O,arguments))return;let fe=Ee&&!!we&&we.indexOf(D)!==-1,oe=h(Y(arguments[2],fe)),_e=oe?.signal;if(_e?.aborted)return;if(he){for(let se=0;se<he.length;se++)if(D===he[se])return fe?o.call(O,D,H,oe):o.apply(this,arguments)}let Oe=oe?typeof oe=="boolean"?!0:oe.capture:!1,Fe=oe&&typeof oe=="object"?oe.once:!1,_t=Zone.current,De=ee[D];De||(at(D,G),De=ee[D]);let We=De[Oe?ce:ae],Te=O[We],qe=!1;if(Te){if(qe=!0,X){for(let se=0;se<Te.length;se++)if(pe(Te[se],H))return}}else Te=O[We]=[];let Pe,Xe=O.constructor.name,Ye=st[Xe];Ye&&(Pe=Ye[D]),Pe||(Pe=Xe+u+(G?G(D):D)),S.options=oe,Fe&&(S.options.once=!1),S.target=O,S.capture=Oe,S.eventName=D,S.isExisting=qe;let ye=U?wt:void 0;ye&&(ye.taskData=S),_e&&(S.options.signal=void 0);let ne=_t.scheduleEventTask(Pe,H,ye,y,R);if(_e){S.options.signal=_e;let se=()=>ne.zone.cancelTask(ne);o.call(_e,"abort",se,{once:!0}),ne.removeAbortListener=()=>_e.removeEventListener("abort",se)}if(S.target=null,ye&&(ye.taskData=null),Fe&&(S.options.once=!0),!Ee&&typeof ne.options=="boolean"||(ne.options=oe),ne.target=O,ne.capture=Oe,ne.eventName=D,B&&(ne.originalDelegate=H),I?Te.unshift(ne):Te.push(ne),m)return O}};return E[a]=l(P,N,$,L,z),W&&(E[g]=l(W,M,s,L,z,!0)),E[f]=function(){let o=this||t,u=arguments[0];d&&d.transferEventName&&(u=d.transferEventName(u));let y=arguments[2],R=y?typeof y=="boolean"?!0:y.capture:!1,m=arguments[1];if(!m)return k.apply(this,arguments);if(F&&!F(k,m,o,arguments))return;let I=ee[u],O;I&&(O=I[R?ce:ae]);let D=O&&o[O];if(D)for(let H=0;H<D.length;H++){let B=D[H];if(pe(B,m)){if(D.splice(H,1),B.isRemoved=!0,D.length===0&&(B.allRemoved=!0,o[O]=null,!R&&typeof u=="string")){let fe=be+"ON_PROPERTY"+u;o[fe]=null}return B.zone.cancelTask(B),z?o:void 0}}return k.apply(this,arguments)},E[_]=function(){let o=this||t,u=arguments[0];d&&d.transferEventName&&(u=d.transferEventName(u));let y=[],R=lt(o,G?G(u):u);for(let m=0;m<R.length;m++){let I=R[m],O=I.originalDelegate?I.originalDelegate:I.callback;y.push(O)}return y},E[T]=function(){let o=this||t,u=arguments[0];if(u){d&&d.transferEventName&&(u=d.transferEventName(u));let y=ee[u];if(y){let R=y[ae],m=y[ce],I=o[R],O=o[m];if(I){let D=I.slice();for(let H=0;H<D.length;H++){let B=D[H],fe=B.originalDelegate?B.originalDelegate:B.callback;this[f].call(this,u,fe,B.options)}}if(O){let D=O.slice();for(let H=0;H<D.length;H++){let B=D[H],fe=B.originalDelegate?B.originalDelegate:B.callback;this[f].call(this,u,fe,B.options)}}}}else{let y=Object.keys(o);for(let R=0;R<y.length;R++){let m=y[R],I=it.exec(m),O=I&&I[1];O&&O!=="removeListener"&&this[T].call(this,O)}this[T].call(this,"removeListener")}if(z)return this},ue(E[a],P),ue(E[f],k),J&&ue(E[T],J),C&&ue(E[_],C),!0}let q=[];for(let v=0;v<c.length;v++)q[v]=te(c[v],n);return q}function lt(t,e){if(!e){let f=[];for(let _ in t){let T=it.exec(_),p=T&&T[1];if(p&&(!e||p===e)){let N=t[_];if(N)for(let g=0;g<N.length;g++)f.push(N[g])}}return f}let c=ee[e];c||(at(e),c=ee[e]);let n=t[c[ae]],a=t[c[ce]];return n?a?n.concat(a):n.slice():a?a.slice():[]}function Rt(t,e){let c=t.Event;c&&c.prototype&&e.patchMethod(c.prototype,"stopImmediatePropagation",n=>function(a,f){a[ct]=!0,n&&n.apply(a,f)})}function Nt(t,e){e.patchMethod(t,"queueMicrotask",c=>function(n,a){Zone.current.scheduleMicroTask("queueMicrotask",a[0])})}var Re=Z("zoneTask");function ge(t,e,c,n){let a=null,f=null;e+=n,c+=n;let _={};function T(N){let g=N.data;return g.args[0]=function(){return N.invoke.apply(this,arguments)},g.handleId=a.apply(t,g.args),N}function p(N){return f.call(t,N.data.handleId)}a=le(t,e,N=>function(g,M){if(typeof M[0]=="function"){let w={isPeriodic:n==="Interval",delay:n==="Timeout"||n==="Interval"?M[1]||0:void 0,args:M},A=M[0];M[0]=function(){try{return A.apply(this,arguments)}finally{w.isPeriodic||(typeof w.handleId=="number"?delete _[w.handleId]:w.handleId&&(w.handleId[Re]=null))}};let V=Ue(e,M[0],w,T,p);if(!V)return V;let j=V.data.handleId;return typeof j=="number"?_[j]=V:j&&(j[Re]=V),j&&j.ref&&j.unref&&typeof j.ref=="function"&&typeof j.unref=="function"&&(V.ref=j.ref.bind(j),V.unref=j.unref.bind(j)),typeof j=="number"||j?j:V}else return N.apply(t,M)}),f=le(t,c,N=>function(g,M){let w=M[0],A;typeof w=="number"?A=_[w]:(A=w&&w[Re],A||(A=w)),A&&typeof A.type=="string"?A.state!=="notScheduled"&&(A.cancelFn&&A.data.isPeriodic||A.runCount===0)&&(typeof w=="number"?delete _[w]:w&&(w[Re]=null),A.zone.cancelTask(A)):N.apply(t,M)})}function Ct(t,e){let{isBrowser:c,isMix:n}=e.getGlobalObjects();if(!c&&!n||!t.customElements||!("customElements"in t))return;let a=["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback","formAssociatedCallback","formDisabledCallback","formResetCallback","formStateRestoreCallback"];e.patchCallbacks(e,t.customElements,"customElements","define",a)}function St(t,e){if(Zone[e.symbol("patchEventTarget")])return;let{eventNames:c,zoneSymbolEventNames:n,TRUE_STR:a,FALSE_STR:f,ZONE_SYMBOL_PREFIX:_}=e.getGlobalObjects();for(let p=0;p<c.length;p++){let N=c[p],g=N+f,M=N+a,w=_+g,A=_+M;n[N]={},n[N][f]=w,n[N][a]=A}let T=t.EventTarget;if(!(!T||!T.prototype))return e.patchEventTarget(t,e,[T&&T.prototype]),!0}function It(t,e){e.patchEventPrototype(t,e)}function ut(t,e,c){if(!c||c.length===0)return e;let n=c.filter(f=>f.target===t);if(!n||n.length===0)return e;let a=n[0].ignoreProperties;return e.filter(f=>a.indexOf(f)===-1)}function et(t,e,c,n){if(!t)return;let a=ut(t,e,c);ot(t,a,n)}function je(t){return Object.getOwnPropertyNames(t).filter(e=>e.startsWith("on")&&e.length>2).map(e=>e.substring(2))}function Ot(t,e){if(Se&&!rt||Zone[t.symbol("patchEvents")])return;let c=e.__Zone_ignore_on_properties,n=[];if(Ge){let a=window;n=n.concat(["Document","SVGElement","Element","HTMLElement","HTMLBodyElement","HTMLMediaElement","HTMLFrameSetElement","HTMLFrameElement","HTMLIFrameElement","HTMLMarqueeElement","Worker"]);let f=vt()?[{target:a,ignoreProperties:["error"]}]:[];et(a,je(a),c&&c.concat(f),Ze(a))}n=n.concat(["XMLHttpRequest","XMLHttpRequestEventTarget","IDBIndex","IDBRequest","IDBOpenDBRequest","IDBDatabase","IDBTransaction","IDBCursor","WebSocket"]);for(let a=0;a<n.length;a++){let f=e[n[a]];f&&f.prototype&&et(f.prototype,je(f.prototype),c)}}function Dt(t){t.__load_patch("legacy",e=>{let c=e[t.__symbol__("legacyPatch")];c&&c()}),t.__load_patch("timers",e=>{let c="set",n="clear";ge(e,c,n,"Timeout"),ge(e,c,n,"Interval"),ge(e,c,n,"Immediate")}),t.__load_patch("requestAnimationFrame",e=>{ge(e,"request","cancel","AnimationFrame"),ge(e,"mozRequest","mozCancel","AnimationFrame"),ge(e,"webkitRequest","webkitCancel","AnimationFrame")}),t.__load_patch("blocking",(e,c)=>{let n=["alert","prompt","confirm"];for(let a=0;a<n.length;a++){let f=n[a];le(e,f,(_,T,p)=>function(N,g){return c.current.run(_,e,g,p)})}}),t.__load_patch("EventTarget",(e,c,n)=>{It(e,n),St(e,n);let a=e.XMLHttpRequestEventTarget;a&&a.prototype&&n.patchEventTarget(e,n,[a.prototype])}),t.__load_patch("MutationObserver",(e,c,n)=>{ke("MutationObserver"),ke("WebKitMutationObserver")}),t.__load_patch("IntersectionObserver",(e,c,n)=>{ke("IntersectionObserver")}),t.__load_patch("FileReader",(e,c,n)=>{ke("FileReader")}),t.__load_patch("on_property",(e,c,n)=>{Ot(n,e)}),t.__load_patch("customElements",(e,c,n)=>{Ct(e,n)}),t.__load_patch("XHR",(e,c)=>{N(e);let n=Z("xhrTask"),a=Z("xhrSync"),f=Z("xhrListener"),_=Z("xhrScheduled"),T=Z("xhrURL"),p=Z("xhrErrorBeforeScheduled");function N(g){let M=g.XMLHttpRequest;if(!M)return;let w=M.prototype;function A(P){return P[n]}let V=w[Me],j=w[Le];if(!V){let P=g.XMLHttpRequestEventTarget;if(P){let k=P.prototype;V=k[Me],j=k[Le]}}let te="readystatechange",q="scheduled";function v(P){let k=P.data,C=k.target;C[_]=!1,C[p]=!1;let J=C[f];V||(V=C[Me],j=C[Le]),J&&j.call(C,te,J);let W=C[f]=()=>{if(C.readyState===C.DONE)if(!k.aborted&&C[_]&&P.state===q){let x=C[c.__symbol__("loadfalse")];if(C.status!==0&&x&&x.length>0){let r=P.invoke;P.invoke=function(){let i=C[c.__symbol__("loadfalse")];for(let s=0;s<i.length;s++)i[s]===P&&i.splice(s,1);!k.aborted&&P.state===q&&r.call(P)},x.push(P)}else P.invoke()}else!k.aborted&&C[_]===!1&&(C[p]=!0)};return V.call(C,te,W),C[n]||(C[n]=P),G.apply(C,k.args),C[_]=!0,P}function d(){}function U(P){let k=P.data;return k.aborted=!0,S.apply(k.target,k.args)}let F=le(w,"open",()=>function(P,k){return P[a]=k[2]==!1,P[T]=k[1],F.apply(P,k)}),X="XMLHttpRequest.send",z=Z("fetchTaskAborting"),E=Z("fetchTaskScheduling"),G=le(w,"send",()=>function(P,k){if(c.current[E]===!0||P[a])return G.apply(P,k);{let C={target:P,url:P[T],isPeriodic:!1,args:k,aborted:!1},J=Ue(X,d,C,v,U);P&&P[p]===!0&&!C.aborted&&J.state===q&&J.invoke()}}),S=le(w,"abort",()=>function(P,k){let C=A(P);if(C&&typeof C.type=="string"){if(C.cancelFn==null||C.data&&C.data.aborted)return;C.zone.cancelTask(C)}else if(c.current[z]===!0)return S.apply(P,k)})}}),t.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&yt(e.navigator.geolocation,["getCurrentPosition","watchPosition"])}),t.__load_patch("PromiseRejectionEvent",(e,c)=>{function n(a){return function(f){lt(e,a).forEach(T=>{let p=e.PromiseRejectionEvent;if(p){let N=new p(a,{promise:f.promise,reason:f.rejection});T.invoke(N)}})}}e.PromiseRejectionEvent&&(c[Z("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),c[Z("rejectionHandledHandler")]=n("rejectionhandled"))}),t.__load_patch("queueMicrotask",(e,c,n)=>{Nt(e,n)})}function Mt(t){t.__load_patch("ZoneAwarePromise",(e,c,n)=>{let a=Object.getOwnPropertyDescriptor,f=Object.defineProperty;function _(h){if(h&&h.toString===Object.prototype.toString){let l=h.constructor&&h.constructor.name;return(l||"")+": "+JSON.stringify(h)}return h?h.toString():Object.prototype.toString.call(h)}let T=n.symbol,p=[],N=e[T("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")]!==!1,g=T("Promise"),M=T("then"),w="__creationTrace__";n.onUnhandledError=h=>{if(n.showUncaughtError()){let l=h&&h.rejection;l?console.error("Unhandled Promise rejection:",l instanceof Error?l.message:l,"; Zone:",h.zone.name,"; Task:",h.task&&h.task.source,"; Value:",l,l instanceof Error?l.stack:void 0):console.error(h)}},n.microtaskDrainDone=()=>{for(;p.length;){let h=p.shift();try{h.zone.runGuarded(()=>{throw h.throwOriginal?h.rejection:h})}catch(l){V(l)}}};let A=T("unhandledPromiseRejectionHandler");function V(h){n.onUnhandledError(h);try{let l=c[A];typeof l=="function"&&l.call(this,h)}catch{}}function j(h){return h&&h.then}function te(h){return h}function q(h){return L.reject(h)}let v=T("state"),d=T("value"),U=T("finally"),F=T("parentPromiseValue"),X=T("parentPromiseState"),z="Promise.then",E=null,G=!0,S=!1,P=0;function k(h,l){return o=>{try{Y(h,l,o)}catch(u){Y(h,!1,u)}}}let C=function(){let h=!1;return function(o){return function(){h||(h=!0,o.apply(null,arguments))}}},J="Promise resolved with itself",W=T("currentTaskTrace");function Y(h,l,o){let u=C();if(h===o)throw new TypeError(J);if(h[v]===E){let y=null;try{(typeof o=="object"||typeof o=="function")&&(y=o&&o.then)}catch(R){return u(()=>{Y(h,!1,R)})(),h}if(l!==S&&o instanceof L&&o.hasOwnProperty(v)&&o.hasOwnProperty(d)&&o[v]!==E)r(o),Y(h,o[v],o[d]);else if(l!==S&&typeof y=="function")try{y.call(o,u(k(h,l)),u(k(h,!1)))}catch(R){u(()=>{Y(h,!1,R)})()}else{h[v]=l;let R=h[d];if(h[d]=o,h[U]===U&&l===G&&(h[v]=h[X],h[d]=h[F]),l===S&&o instanceof Error){let m=c.currentTask&&c.currentTask.data&&c.currentTask.data[w];m&&f(o,W,{configurable:!0,enumerable:!1,writable:!0,value:m})}for(let m=0;m<R.length;)i(h,R[m++],R[m++],R[m++],R[m++]);if(R.length==0&&l==S){h[v]=P;let m=o;try{throw new Error("Uncaught (in promise): "+_(o)+(o&&o.stack?`
`+o.stack:""))}catch(I){m=I}N&&(m.throwOriginal=!0),m.rejection=o,m.promise=h,m.zone=c.current,m.task=c.currentTask,p.push(m),n.scheduleMicroTask()}}}return h}let x=T("rejectionHandledHandler");function r(h){if(h[v]===P){try{let l=c[x];l&&typeof l=="function"&&l.call(this,{rejection:h[d],promise:h})}catch{}h[v]=S;for(let l=0;l<p.length;l++)h===p[l].promise&&p.splice(l,1)}}function i(h,l,o,u,y){r(h);let R=h[v],m=R?typeof u=="function"?u:te:typeof y=="function"?y:q;l.scheduleMicroTask(z,()=>{try{let I=h[d],O=!!o&&U===o[U];O&&(o[F]=I,o[X]=R);let D=l.run(m,void 0,O&&m!==q&&m!==te?[]:[I]);Y(o,!0,D)}catch(I){Y(o,!1,I)}},o)}let s="function ZoneAwarePromise() { [native code] }",b=function(){},$=e.AggregateError;class L{static toString(){return s}static resolve(l){return l instanceof L?l:Y(new this(null),G,l)}static reject(l){return Y(new this(null),S,l)}static withResolvers(){let l={};return l.promise=new L((o,u)=>{l.resolve=o,l.reject=u}),l}static any(l){if(!l||typeof l[Symbol.iterator]!="function")return Promise.reject(new $([],"All promises were rejected"));let o=[],u=0;try{for(let m of l)u++,o.push(L.resolve(m))}catch{return Promise.reject(new $([],"All promises were rejected"))}if(u===0)return Promise.reject(new $([],"All promises were rejected"));let y=!1,R=[];return new L((m,I)=>{for(let O=0;O<o.length;O++)o[O].then(D=>{y||(y=!0,m(D))},D=>{R.push(D),u--,u===0&&(y=!0,I(new $(R,"All promises were rejected")))})})}static race(l){let o,u,y=new this((I,O)=>{o=I,u=O});function R(I){o(I)}function m(I){u(I)}for(let I of l)j(I)||(I=this.resolve(I)),I.then(R,m);return y}static all(l){return L.allWithCallback(l)}static allSettled(l){return(this&&this.prototype instanceof L?this:L).allWithCallback(l,{thenCallback:u=>({status:"fulfilled",value:u}),errorCallback:u=>({status:"rejected",reason:u})})}static allWithCallback(l,o){let u,y,R=new this((D,H)=>{u=D,y=H}),m=2,I=0,O=[];for(let D of l){j(D)||(D=this.resolve(D));let H=I;try{D.then(B=>{O[H]=o?o.thenCallback(B):B,m--,m===0&&u(O)},B=>{o?(O[H]=o.errorCallback(B),m--,m===0&&u(O)):y(B)})}catch(B){y(B)}m++,I++}return m-=2,m===0&&u(O),R}constructor(l){let o=this;if(!(o instanceof L))throw new Error("Must be an instanceof Promise.");o[v]=E,o[d]=[];try{let u=C();l&&l(u(k(o,G)),u(k(o,S)))}catch(u){Y(o,!1,u)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return L}then(l,o){let u=this.constructor?.[Symbol.species];(!u||typeof u!="function")&&(u=this.constructor||L);let y=new u(b),R=c.current;return this[v]==E?this[d].push(R,y,l,o):i(this,R,y,l,o),y}catch(l){return this.then(null,l)}finally(l){let o=this.constructor?.[Symbol.species];(!o||typeof o!="function")&&(o=L);let u=new o(b);u[U]=U;let y=c.current;return this[v]==E?this[d].push(y,u,l,l):i(this,y,u,l,l),u}}L.resolve=L.resolve,L.reject=L.reject,L.race=L.race,L.all=L.all;let de=e[g]=e.Promise;e.Promise=L;let pe=T("thenPatched");function he(h){let l=h.prototype,o=a(l,"then");if(o&&(o.writable===!1||!o.configurable))return;let u=l.then;l[M]=u,h.prototype.then=function(y,R){return new L((I,O)=>{u.call(this,I,O)}).then(y,R)},h[pe]=!0}n.patchThen=he;function we(h){return function(l,o){let u=h.apply(l,o);if(u instanceof L)return u;let y=u.constructor;return y[pe]||he(y),u}}return de&&(he(de),le(e,"fetch",h=>we(h))),Promise[c.__symbol__("uncaughtPromiseErrors")]=p,L})}function Lt(t){t.__load_patch("toString",e=>{let c=Function.prototype.toString,n=Z("OriginalDelegate"),a=Z("Promise"),f=Z("Error"),_=function(){if(typeof this=="function"){let g=this[n];if(g)return typeof g=="function"?c.call(g):Object.prototype.toString.call(g);if(this===Promise){let M=e[a];if(M)return c.call(M)}if(this===Error){let M=e[f];if(M)return c.call(M)}}return c.call(this)};_[n]=c,Function.prototype.toString=_;let T=Object.prototype.toString,p="[object Promise]";Object.prototype.toString=function(){return typeof Promise=="function"&&this instanceof Promise?p:T.call(this)}})}function At(t,e,c,n,a){let f=Zone.__symbol__(n);if(e[f])return;let _=e[f]=e[n];e[n]=function(T,p,N){return p&&p.prototype&&a.forEach(function(g){let M=`${c}.${n}::`+g,w=p.prototype;try{if(w.hasOwnProperty(g)){let A=t.ObjectGetOwnPropertyDescriptor(w,g);A&&A.value?(A.value=t.wrapWithCurrentZone(A.value,M),t._redefineProperty(p.prototype,g,A)):w[g]&&(w[g]=t.wrapWithCurrentZone(w[g],M))}else w[g]&&(w[g]=t.wrapWithCurrentZone(w[g],M))}catch{}}),_.call(e,T,p,N)},t.attachOriginToPatched(e[n],_)}function jt(t){t.__load_patch("util",(e,c,n)=>{let a=je(e);n.patchOnProperties=ot,n.patchMethod=le,n.bindArguments=ze,n.patchMacroTask=kt;let f=c.__symbol__("BLACK_LISTED_EVENTS"),_=c.__symbol__("UNPATCHED_EVENTS");e[_]&&(e[f]=e[_]),e[f]&&(c[f]=c[_]=e[f]),n.patchEventPrototype=Rt,n.patchEventTarget=Pt,n.isIEOrEdge=bt,n.ObjectDefineProperty=xe,n.ObjectGetOwnPropertyDescriptor=ve,n.ObjectCreate=Et,n.ArraySlice=mt,n.patchClass=ke,n.wrapWithCurrentZone=Be,n.filterProperties=ut,n.attachOriginToPatched=ue,n._redefineProperty=Object.defineProperty,n.patchCallbacks=At,n.getGlobalObjects=()=>({globalSources:st,zoneSymbolEventNames:ee,eventNames:a,isBrowser:Ge,isMix:rt,isNode:Se,TRUE_STR:ce,FALSE_STR:ae,ZONE_SYMBOL_PREFIX:be,ADD_EVENT_LISTENER_STR:$e,REMOVE_EVENT_LISTENER_STR:He})})}function xt(t){Mt(t),Lt(t),jt(t)}var ft=gt();xt(ft);Dt(ft);var Zt=":";var Ve=class{visitText(e,c){return e.value}visitContainer(e,c){return`[${e.children.map(n=>n.visit(this)).join(", ")}]`}visitIcu(e,c){let n=Object.keys(e.cases).map(a=>`${a} {${e.cases[a].visit(this)}}`);return`{${e.expression}, ${e.type}, ${n.join(", ")}}`}visitTagPlaceholder(e,c){return e.isVoid?`<ph tag name="${e.startName}"/>`:`<ph tag name="${e.startName}">${e.children.map(n=>n.visit(this)).join(", ")}</ph name="${e.closeName}">`}visitPlaceholder(e,c){return e.value?`<ph name="${e.name}">${e.value}</ph>`:`<ph name="${e.name}"/>`}visitIcuPlaceholder(e,c){return`<ph icu name="${e.name}">${e.value.visit(this)}</ph>`}visitBlockPlaceholder(e,c){return`<ph block name="${e.startName}">${e.children.map(n=>n.visit(this)).join(", ")}</ph name="${e.closeName}">`}},Bt=new Ve;var ht;(function(t){t[t.Little=0]="Little",t[t.Big=1]="Big"})(ht||(ht={}));function $t(t,e){for(let c=1,n=1;c<t.length;c++,n++)if(e[n]==="\\")n++;else if(t[c]===Zt)return c;throw new Error(`Unterminated $localize metadata block in "${e}".`)}var Ie=function(t,...e){if(Ie.translate){let n=Ie.translate(t,e);t=n[0],e=n[1]}let c=dt(t[0],t.raw[0]);for(let n=1;n<t.length;n++)c+=e[n-1]+dt(t[n],t.raw[n]);return c},Ht=":";function dt(t,e){return e.charAt(0)===Ht?t.substring($t(t,e)+1):t}globalThis.$localize=Ie;
