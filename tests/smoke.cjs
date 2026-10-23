/* 可选开发检查：node tests/smoke.cjs；无需 npm 或浏览器。 */
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function env(block=false){const memory=new Map(),c={console,Date,Math,JSON,localStorage:{getItem:k=>{if(block)throw Error();return memory.get(k)||null;},setItem:(k,v)=>{if(block)throw Error();memory.set(k,v);}}};c.window=c;vm.createContext(c);for(const file of ['data.js','art.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file});return c;}
const c=env(),D=c.GAME_DATA;
assert.equal(D.stages.length,12);assert.ok(D.stages.reduce((s,x)=>s+x.decisions.length,0)>=45);assert.ok(D.events.length>=14);assert.equal(D.achievements.length,14);assert.ok(D.endings.length+D.modifiers.length>=12);
let decisions=0,options=0;
for(const s of D.stages){assert.ok(D.ART[s.art]);assert.ok(s.intro.length>=80&&s.intro.length<=150,[s.id,s.intro.length].join(':'));}
for(const s of [...D.stages,...D.vocational])for(const d of s.decisions){decisions++;assert.ok(d.options.length>=1&&d.options.length<=4);}
for(const d of [...D.stages.flatMap(x=>x.decisions),...D.vocational.flatMap(x=>x.decisions),...D.events])for(const o of d.options){options++;assert.ok(o.text&&o.feedback);const v=Object.entries(o.effects).flatMap(([k,x])=>k==='academic'?Object.values(x):[x]);assert.ok(v.some(x=>x>0),'no benefit: '+d.id+' '+o.text);assert.ok(v.some(x=>x<0),'no cost: '+d.id+' '+o.text);if(o.effects.money<=-15)assert.ok(o.require&&o.require.money>=-o.effects.money);for(const [k,x] of Object.entries(o.effects)){assert.ok(k in D.initialState,k);if(k==='academic')for(const t of Object.keys(x))assert.ok(t in D.initialState.academic);for(const n of k==='academic'?Object.values(x):[x])assert.ok(Math.abs(n)<=20,d.id+': '+n);}}
for(const file of ['index.html','style.css','data.js','art.js','game.js']){const text=fs.readFileSync(path.join(root,file),'utf8');assert.ok(!/(?:https?:\/\/|type\s*=\s*["']module["']|\bfetch\s*\(|XMLHttpRequest|@import)/i.test(text),file);}
function run(seed,policy='balanced',reload=false){const x=env(),g=x.Game;g.start(String(seed));let steps=0;while(g.getState().screen!=='result'){let s=g.getState();assert.ok(++steps<450);if(s.phase==='decisions'||s.phase==='events'){const d=g.getCurrent(),available=g.getAvailable();if(d.kind==='subjects')g.setForm({primary:'physics',secondary:['chemistry','biology']});if(d.kind==='transfer'){const picked=s.picked;g.setForm({from:picked.primary,to:picked.primary==='physics'?'history':'physics'});}let index=0;
if(policy==='random')index=available.map((b,i)=>b?i:-1).filter(i=>i>=0)[(s.rng+steps)%available.filter(Boolean).length];
else if(policy==='neglect'){const scores=d.options.map(o=>Object.values(o.effects.academic||{}).reduce((a,b)=>a+b,0)*3+(o.effects.iq||0)*3+(o.effects.selfD||0)*2+(o.flags.includes('pressure')?100:0));index=scores.indexOf(Math.min(...scores));}
else if(policy==='pressure')index=d.options.findIndex(o=>o.flags.includes('pressure')||o.flags.includes('tutoring'));
else if(policy==='free')index=d.options.findIndex(o=>o.flags.includes('free_range'));
else if(policy==='music')index=d.options.findIndex(o=>o.flags.includes('music_path')||o.flags.includes('route_art'));
else if(policy==='sports')index=d.options.findIndex(o=>o.flags.includes('sports_path')||o.flags.includes('route_sports'));
else if(policy==='coding')index=d.options.findIndex(o=>o.flags.includes('coding_path')||o.flags.includes('route_competition'));
if(index<0||!available[index])index=available.findIndex(Boolean);assert.ok(index>=0);assert.ok(g.choose(index));assert.equal(g.choose(index),false);
}else g.advance();s=g.getState();for(const k of Object.keys(D.initialState).filter(k=>typeof D.initialState[k]==='number'&&!['seed','stageIndex'].includes(k)))assert.ok(s[k]>=0&&s[k]<=100);assert.ok(g.validate(g.getSave()),'invalid own save '+s.stageIndex+' '+s.phase);if(reload&&steps%7===0)assert.ok(g.restore(g.getSave()));}
const s=g.getState();assert.equal(s.snapshots.length,12);if(!s.exam.paused){assert.ok(s.exam.total>=0&&s.exam.total<=750);if(!s.exam.vocational){assert.equal(s.exam.rows.length,6);assert.equal(s.exam.rows.reduce((a,b)=>a+b.max,0),750);assert.equal(s.exam.rows.filter(r=>r.mode==='assigned').length,2);assert.equal(s.exam.rows.reduce((a,b)=>a+b.score,0)-s.exam.penalty,s.exam.total);}}return s;}
const totals={};for(const p of ['balanced','pressure','free','music','sports','coding','random','neglect']){const results=[];for(let seed=1;seed<=30;seed++){const s=run(seed,p);results.push(s.exam.total);totals[s.result.main]=(totals[s.result.main]||0)+1;}const scores=results.filter(x=>x!==null);console.log(p,scores.length?Math.min(...scores):'paused',scores.length?Math.max(...scores):'paused');}
const a=run(123,'balanced'),b=run(123,'balanced',true);assert.deepEqual(JSON.parse(JSON.stringify(a.exam)),JSON.parse(JSON.stringify(b.exam)));assert.deepEqual(JSON.parse(JSON.stringify(a.log)),JSON.parse(JSON.stringify(b.log)));
const g=c.Game;assert.equal(g.assign(0).score,100);assert.equal(g.assign(.15).grade,'B');assert.equal(g.assign(.5).grade,'C');assert.equal(g.assign(.85).grade,'D');assert.equal(g.assign(.98).grade,'E');assert.equal(g.assign(1).score,30);
g.start('clamp');g.applyEffects({money:-999,mind:999,stress:999,academic:{math:999}});assert.equal(g.getState().money,0);assert.equal(g.getState().mind,100);assert.ok(g.getState().academic.math<=100&&g.getState().academic.math>90);assert.equal(g.getState().stress,100);const bad=g.getSave();bad.state.money=101;assert.equal(g.validate(bad),null);bad.state.money=0;bad.state.academic.math='bad';assert.equal(g.validate(bad),null);
const blocked=env(true);blocked.Game.start('blocked');blocked.Game.advance();assert.ok(blocked.Game.choose(0));
console.log(JSON.stringify({decisions,options,events:D.events.length,simulations:242,endings:totals,passed:true},null,2));

// 对非主流结局与边界采用明确状态夹具，避免用概率碰运气掩盖判定错误。
function finalFixture(overrides={}){const x=env(),p={format:'MyChild',version:1,state:JSON.parse(JSON.stringify(a))};Object.assign(p.state,{phase:'summary',screen:'play',result:null,exam:null,stageApplied:true,route:'general',mind:80,stress:20,bond:80,rebellion:10,...overrides});assert.ok(x.Game.restore(p));x.Game.advance();return x.Game.getState();}
assert.equal(finalFixture({mind:19}).result.main,'dropout');
assert.equal(finalFixture({bond:19,rebellion:76}).result.main,'estrangement');
for(const route of ['study','job','upgrade']){const s=finalFixture({track:'vocational',vocRoute:route});assert.equal(s.result.main,'vocational_track');assert.ok(c.Game.validate({format:'MyChild',version:1,state:s}));}
const stressed=finalFixture({mind:70,stress:90});assert.ok(stressed.exam.factor>=.9&&stressed.exam.factor<=.95);assert.ok(stressed.exam.penalty>0);
assert.equal(finalFixture({route:'art',music:80}).result.main,'art_route');
assert.equal(finalFixture({route:'sports',sports:80,fitness:65}).result.main,'sports_route');
const sportNo=finalFixture({route:'sports',sports:80,fitness:59});assert.notEqual(sportNo.result.main,'sports_route');
const competitionFlags={...a.flags,competition_pass:1};assert.equal(finalFixture({route:'competition',coding:80,iq:85,flags:competitionFlags}).result.main,'competition');
assert.notEqual(finalFixture({route:'competition',coding:80,iq:85,flags:{...competitionFlags,competition_pass:0}}).result.main,'competition');
// 无论高考分多高，亲子决裂仍比学科录取优先；叠加层不抢占主结局。
const estranged=finalFixture({bond:10,rebellion:90,route:'art',music:100});assert.equal(estranged.result.main,'estrangement');
const happy=finalFixture();assert.ok(happy.result.modifiers.includes('ordinary_but_happy'));
for(const phase of ['intro','decisions','feedback','summary']){const x=env();x.Game.start('roundtrip');if(phase!=='intro')x.Game.advance();if(phase==='feedback')x.Game.choose(0);if(phase==='summary'){let count=0;while(x.Game.getState().phase!=='summary'){const t=x.Game.getState();if(['decisions','events'].includes(t.phase))x.Game.choose(0);else x.Game.advance();assert.ok(count++<25);}}assert.ok(x.Game.restore(x.Game.getSave()));}
const dir=process.argv[2];if(dir){fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'qa-result-state.js'),'window.QA_SAVE='+JSON.stringify({format:'MyChild',version:1,state:a})+';');fs.writeFileSync(path.join(dir,'qa-voc-state.js'),'window.QA_SAVE='+JSON.stringify({format:'MyChild',version:1,state:finalFixture({track:'vocational',vocRoute:'upgrade'})})+';');}
console.log('Boundary, priority, vocational, stress and save checks passed.');

for(const [value,id] of [[30,'junior_college'],[55,'second_tier'],[70,'first_tier'],[90,'good_university'],[100,'top_university']]){const academic=Object.fromEntries(Object.keys(D.initialState.academic).map(k=>[k,value]));assert.equal(finalFixture({academic,iq:60,selfD:60,bond:60}).result.main,id);}
const lowMoney=finalFixture({money:5,academic:Object.fromEntries(Object.keys(D.initialState.academic).map(k=>[k,30])),iq:60,selfD:60});assert.ok(lowMoney.result.modifiers.includes('money_ruin'));
// 从高二转科决策进入，校验只替换一门、代价只收一次、不能重复点击。
const tx=env(),tp={format:'MyChild',version:1,state:JSON.parse(JSON.stringify(a))};Object.assign(tp.state,{stageIndex:10,cursor:0,phase:'decisions',screen:'play',result:null,exam:null,stageApplied:false,feedback:null,energy:80,mind:80,log:[],snapshots:[]});delete tp.state.flags.subject_transferred;assert.ok(tx.Game.restore(tp));const before=tx.Game.getState();tx.Game.setForm({from:'physics',to:'history'});assert.ok(tx.Game.choose(1));const after=tx.Game.getState();assert.equal(after.picked.primary,'history');assert.equal(after.academic.history,Math.max(0,before.academic.history-25));assert.equal(after.energy,60);assert.equal(after.mind,70);assert.equal(tx.Game.choose(1),false);
console.log('All score bands, modifiers and one-time transfer passed.');
const migrated=env();assert.ok(migrated.Game.restore({format:'MyChild',version:1,state:JSON.parse(JSON.stringify(a)),profile:{achievements:['house'],collection:['top_university']}}));assert.ok(migrated.Game.getSave().profile.achievements.includes('house'));assert.ok(migrated.Game.getSave().profile.collection.includes('top_university'));console.log('Profile migration merge passed.');
