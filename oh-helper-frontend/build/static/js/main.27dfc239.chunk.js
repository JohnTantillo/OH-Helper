(this["webpackJsonpoh-helper"]=this["webpackJsonpoh-helper"]||[]).push([[0],{134:function(e,t,n){},146:function(e,t){},148:function(e,t){},158:function(e,t){},160:function(e,t){},185:function(e,t){},187:function(e,t){},188:function(e,t){},193:function(e,t){},195:function(e,t){},201:function(e,t){},203:function(e,t){},222:function(e,t){},234:function(e,t){},237:function(e,t){},240:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),i=n(127),c=n.n(i),o=(n(134),n(4)),r=n(5),l=n(7),u=n(6),p=(n(46),n(0)),h=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsx)("div",{className:this.props.active?"aButton "+this.props.buttonType:"iButton "+this.props.buttonType,onClick:this.props.active?function(){return e.props.onclick()}:function(){},children:Object(p.jsx)("span",{children:this.props.text})})}}]),n}(a.a.Component),d=h;h.defaultProps={active:!1,text:"",buttonType:""};var j=n(8);function m(e){var t=Object(j.f)();return Object(p.jsx)("div",{className:e.active?"aButton "+e.buttonType:"iButton "+e.buttonType,onClick:e.active?function(){e.onclick()?t.push(e.route):alert("Something went wrong.")}:function(){},children:Object(p.jsx)("span",{children:e.text})})}n(72);var O=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).login=function(){var e=s.state.email,t=s.state.password;return fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t,salt:""})}).then((function(e){return""!=e?e.json():""})).then((function(e){console.log(e),""!==e?"teacher"===e.AccType?s.props.loginFlag(!0,!1,e.Username):"student"===e.AccType?s.props.loginFlag(!0,!0,e.Username):"instructor"===e.AccType&&s.props.loginFlag(!0,!1,e.Username):s.props.loginFlag(!1,!1,"")})),!0},s.emailOnChange=function(e){s.setState({email:e.target.value})},s.passwordOnChange=function(e){s.setState({password:e.target.value})},s.state={email:"",password:""},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"loginPageContainer",children:[Object(p.jsx)("div",{className:"logoText",children:"OH-Helper"}),Object(p.jsx)("div",{className:"loginWindowContainer",children:Object(p.jsxs)("div",{className:"loginWindow",children:[Object(p.jsx)("p",{className:"loginHeader",children:"Login/Create Account"}),Object(p.jsx)("div",{className:"lineBreak"}),Object(p.jsx)("p",{className:"email inputHeader",children:"Email:"}),Object(p.jsx)("input",{type:"email",name:"email",id:"email",className:"input",placeholder:"Email...",onChange:this.emailOnChange}),Object(p.jsx)("p",{className:"password inputHeader",children:"Password:"}),Object(p.jsx)("input",{type:"password",name:"password",id:"password",className:"input",placeholder:"Password...",onChange:this.passwordOnChange}),Object(p.jsx)(d,{active:!0,onclick:this.login,text:"Login",buttonType:"loginButton"}),Object(p.jsx)(m,{active:!0,route:"/createAccount",onclick:function(){return!0},text:"Create Account",buttonType:"createButton"})]})})]})}}]),n}(a.a.Component),b=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:this.props.last?this.props.active?this.props.name+" dropoption active last":this.props.name+" dropoption inactive last":this.props.first?this.props.active?this.props.name+" dropoption active first":this.props.name+" dropoption inactive first":this.props.active?this.props.name+" dropoption active":this.props.name+" dropoption inactive",onClick:this.props.onClick,children:[this.props.text,this.props.last?null:Object(p.jsx)("div",{className:"dropdownLines"})]})}}]),n}(a.a.Component),v=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){var e=this;return Object(p.jsx)("div",{className:this.props.active?this.props.name+" dropdown active":this.props.name+" dropdown inactive",children:this.props.options.map((function(t){return t===e.props.options.at(-1)?Object(p.jsx)(b,{name:t.name,text:t.text,active:t.active,onClick:t.onClick,last:!0,first:!1},t.name):t===e.props.options.at(0)?Object(p.jsx)(b,{name:t.name,text:t.text,active:t.active,onClick:t.onClick,last:!1,first:!0},t.name):Object(p.jsx)(b,{name:t.name,text:t.text,active:t.active,onClick:t.onClick,last:!1,first:!1},t.name)}))})}}]),n}(a.a.Component),x=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).dropPressed=function(){s.setState({isDropped:!s.state.isDropped})},s.state={isDropped:!1},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:this.props.active?this.props.name+" dropContainer active":this.props.name+" dropContainer inactive",children:[Object(p.jsx)("div",{className:"dropdownHeader",onClick:this.dropPressed,children:this.props.text}),this.state.isDropped?Object(p.jsx)("div",{className:"dropComponent",children:Object(p.jsx)(v,{active:!0,options:this.props.options,name:"TAOptions"})}):null]})}}]),n}(a.a.Component),f=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).state={teacherOptions:!!s.props.admin,optionsList:[{name:"accept",text:"Accept",active:!0,onClick:function(){console.log("test")}},{name:"delete",text:"Delete",active:!0,onClick:function(){console.log("test")}},{name:"moveup",text:"Move Up",active:!0,onClick:function(){console.log("test")}},{name:"movedown",text:"Move Down",active:!0,onClick:function(){console.log("test")}}]},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"questionWindow",children:[Object(p.jsxs)("div",{className:"leftContainer",children:[Object(p.jsx)("div",{className:"nameHolder",children:this.props.name}),this.state.teacherOptions?Object(p.jsx)(x,{active:!0,name:"teacherOptions",options:this.state.optionsList,text:"Options"}):Object(p.jsx)("div",{className:"styleTest"})]}),Object(p.jsx)("div",{className:"questionHolder",children:this.props.question})]})}}]),n}(a.a.Component),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).searchOnChanged=function(e){s.setState({searchText:e.target.value})},s.submitQuestion=function(){console.log("Do stuff")},s.state={ticket:[{name:"John Dunaske",question:"Is this a test?"},{name:"John Dunaske",question:"Is this a test?"}],searchResults:[],student:!1,searchText:""},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"teacherViewContainer",children:[Object(p.jsxs)("div",{className:"teacherQueueContainer",children:[Object(p.jsx)("div",{className:"teacher headerText",children:"Student Queue"}),Object(p.jsx)("div",{className:"teacherQueueWindow",children:this.state.ticket.map((function(e){return Object(p.jsx)(f,{name:e.name,question:e.question,admin:!0},e.name)}))})]}),Object(p.jsxs)("div",{className:"rightMaster",children:[Object(p.jsx)("div",{className:"accountName",children:"Welcome, "+this.props.name}),Object(p.jsx)("div",{className:"studentSearchHeader",children:"Student Search:"}),Object(p.jsx)("input",{className:"studentSearchBar",type:"text",placeholder:"Search...",onChange:this.searchOnChanged}),Object(p.jsx)(d,{buttonType:"search",active:!0,text:"Search"}),Object(p.jsx)("div",{className:"resultsContainer",children:this.state.searchResults.map((function(e){return Object(p.jsx)("p",{children:"Test"})}))})]})]})}}]),n}(a.a.Component),C=n.p+"static/media/blankProfilePhoto.c3f94521.png",N=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"taWindow",children:[Object(p.jsx)("img",{className:"taImage",src:this.props.img,alt:C}),Object(p.jsxs)("div",{className:"rightSide",children:[Object(p.jsx)("div",{className:"taName",children:this.props.name}),Object(p.jsx)("div",{className:"lineBreak"}),Object(p.jsx)("div",{className:"taSpecialties",children:"Specialties:"}),Object(p.jsx)("div",{className:"taSpecialtiesList",children:this.props.special.join(", ")})]})]})}}]),n}(a.a.Component);N.defaultProps={img:C};var w=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).questionOnChanged=function(e){s.setState({question:e.target.value})},s.submitQuestion=function(){console.log("Do stuff")},s.state={ticket:[{name:"John Dunaske",question:"Is this a test?"},{name:"John Dunaske",question:"Is this a test?"}],activeTAs:[],student:!0,question:"",questionMaxLength:100,questionMinLength:20},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"studentViewContainer",children:[Object(p.jsxs)("div",{className:"studentQueueContainer",children:[Object(p.jsx)("div",{className:"student headerText",children:"Student Queue"}),Object(p.jsx)("div",{className:"studentQueueWindow",children:this.state.ticket.map((function(e){return Object(p.jsx)(f,{name:e.name,question:e.question,admin:!1})}))})]}),Object(p.jsxs)("div",{className:"rightMasterStudent",children:[Object(p.jsx)("div",{className:"accountName",children:"Welcome, "+this.props.name}),Object(p.jsx)("div",{className:"activeTA headerText",children:"Active TA's"}),Object(p.jsx)("div",{className:"activeTAWindow",children:this.state.activeTAs.map((function(e){return Object(p.jsx)(N,{name:e.name,special:e.specialties})}))}),Object(p.jsxs)("div",{className:"newQuestionContainer",children:[Object(p.jsx)("div",{className:"newQuestionHeader",children:"New Question"}),Object(p.jsxs)("p",{className:"charCount",children:["Min: ",this.state.question.length,"/",this.state.questionMinLength," ","Max: ",this.state.question.length,"/",this.state.questionMaxLength]}),Object(p.jsx)("textarea",{type:"text",className:"newQuestionInput",placeholder:"Write question here...",maxLength:this.state.questionMaxLength,minLength:this.state.questionMinLength,onChange:this.questionOnChanged}),Object(p.jsx)("div",{className:"buttonContainer",children:Object(p.jsx)(d,{active:!0,text:"Post",buttonType:"postButton",onclick:this.submitQuestion})})]})]})]})}}]),n}(a.a.Component),y=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).createAccount=function(){var e=s.state.name,t=s.state.email,n=s.state.ubit,a=s.state.confirmPass,i=s.state.password,c=s.state.accType;return a===i&&(fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:i,name:e,ubit:n,salt:"",accType:c})}),!0)},s.nameOnChange=function(e){s.setState({name:e.target.value})},s.emailOnChange=function(e){s.setState({email:e.target.value})},s.passwordOnChange=function(e){s.setState({password:e.target.value})},s.confirmPassOnChange=function(e){s.setState({confirmPass:e.target.value})},s.ubitOnChange=function(e){s.setState({ubit:e.target.value})},s.accTypeOnChange=function(e){s.setState({accType:e.target.value})},s.state={name:"",email:"",password:"",confirmPass:"",ubit:"",accType:"student"},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"createPageContainer",children:[Object(p.jsx)("div",{className:"logoText",children:"OH-Helper"}),Object(p.jsx)("div",{className:"createWindowContainer",children:Object(p.jsxs)("div",{className:"createWindow",children:[Object(p.jsx)("p",{className:"createHeader",children:"Create Account"}),Object(p.jsx)("div",{className:"lineBreak"}),Object(p.jsx)("p",{className:"name inputHeader",children:"Full Name:"}),Object(p.jsx)("input",{type:"text",className:"name input",placeholder:"Full Name...",onChange:this.nameOnChange}),Object(p.jsx)("p",{className:"email inputHeader",children:"Email:"}),Object(p.jsx)("input",{type:"text",className:"email input",placeholder:"Email...",onChange:this.emailOnChange}),Object(p.jsx)("p",{className:"password inputHeader",children:"Password:"}),Object(p.jsx)("input",{type:"password",className:"password input",placeholder:"Password...",onChange:this.passwordOnChange}),Object(p.jsx)("p",{className:"cPassword inputHeader",children:"Confirm Password:"}),Object(p.jsx)("input",{type:"password",className:"cPassword input",placeholder:"Confirm Password...",onChange:this.confirmPassOnChange}),Object(p.jsx)("p",{className:"ubit inputHeader",children:"UBIT:"}),Object(p.jsx)("input",{type:"text",className:"ubit input",placeholder:"UBIT...",onChange:this.ubitOnChange}),Object(p.jsx)("p",{className:"accType inputHeader",children:"Account Type:"}),Object(p.jsxs)("select",{className:"accountType dropdown",onChange:this.accTypeOnChange,children:[Object(p.jsx)("option",{value:"student",children:" Student"}),Object(p.jsx)("option",{value:"teacher",children:"Teacher"})]}),Object(p.jsx)(m,{active:!0,route:"/",onclick:this.createAccount,text:"Create Account",buttonType:"createButton"})]})})]})}}]),n}(a.a.Component),k=n(38),T=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).setLoginFlag=function(e,t,n){s.setState({loggedIn:e,student:t,name:n})},s.state={loggedIn:!1,student:!0,name:""},s}return Object(r.a)(n,[{key:"render",value:function(){return Object(p.jsx)(k.a,{basename:"",children:Object(p.jsx)("div",{className:"App",children:Object(p.jsx)("div",{className:this.state.loggedIn?"mContent":"mContentOut",children:Object(p.jsxs)(j.c,{children:[Object(p.jsx)(j.a,{path:"/createAccount",children:Object(p.jsx)(y,{})}),Object(p.jsx)(j.a,{path:"/",children:this.state.loggedIn?this.state.student?Object(p.jsx)(w,{name:this.state.name}):Object(p.jsx)(g,{name:this.state.name}):Object(p.jsx)(O,{loginFlag:this.setLoginFlag})})]})})})})}}]),n}(a.a.Component),S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,241)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),s(e),a(e),i(e),c(e)}))};c.a.render(Object(p.jsx)(k.a,{children:Object(p.jsx)(T,{})}),document.getElementById("root")),S()},46:function(e,t,n){}},[[240,1,2]]]);
//# sourceMappingURL=main.27dfc239.chunk.js.map