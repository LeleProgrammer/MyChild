/* MyChild · GPL-3.0-only。内容与平衡数据集中于此，无远程依赖。 */
(function () {
'use strict';
const O=(text,effects,feedback,flags=[],extra={})=>{ const opt=Object.assign({text,effects,feedback,flags},extra); if(effects.selectedGain){opt.selectedGain=effects.selectedGain; delete effects.selectedGain;} if(effects.money<=-15&&!opt.require)opt.require={money:-effects.money}; return opt; };
const D=(id,prompt,hint,options,extra={})=>Object.assign({id,prompt,hint,options},extra);
const E=(id,chance,prompt,options)=>({id,chance,prompt,options});
const A=(values)=>({academic:values});
const art=(n)=>'svg_'+n;
const stages=[
{ id:'pregnancy', title:'-1~0 岁 · 备孕与孕期',ageLabel:'-1~0 岁',art:art('pregnancy'),
intro:'你把两道杠的照片放大又缩小，最后只发给了家里人。餐桌上开始出现产检单、叶酸和计算到月底的账本。孩子还没有名字，关于工作的安排、谁来照顾、该花多少钱的讨论却已经开始。你第一次发现，做家长不是等一个人出生，而是提前为一个人重新摆放生活。',
decisions:[
D('checkup','产检预约单上，有基础套餐，也有价格翻倍的附加项目。','经济 / 精力 / 体质',[
O('按医生建议完成必要检查',{money:-10,energy:-4,fitness:9},'你把检查日期圈进日历。家里终于少了一件悬着的事。'),
O('选择更细致的自费服务',{money:-18,fitness:12,marriage:3},'候诊室很安静，缴费短信却让你重新算了一遍这个月的预算。',[],{require:{money:18}}),
O('利用公立资源，自己研究流程',{energy:-12,money:3,fitness:6},'你把挂号攻略写了两页。轮到你时，保温杯里的水已经凉了。'),
O('基础检查之外先保留应急金',{money:6,fitness:-3,mind:3},'你把钱存进单独的账户，也答应下一次不再拖延必要的预约。')]),
D('preg_work','项目最忙的时候，家里也需要有人早一点下班。','经济 / 精力 / 家庭关系',[
O('轮流调班，把家务写成清单',{energy:-8,marriage:10,mind:3},'清单上第一次有了两个人的字迹。晚饭晚了一点，却没人独自收拾厨房。',['teamwork']),
O('继续争取奖金，请人分担',{money:10,energy:-10,marriage:-5},'奖金到账的那天，你在电梯里接到了第三个催回家的电话。',['overtime']),
O('缩减工作量，留出休息',{money:-12,energy:10,fitness:5},'你把工作群静音了一个晚上，窗外的雨声终于听得见。'),
O('请长辈暂时来住',{money:-4,energy:8,marriage:-6},'冰箱一下装满了。关于饭该怎么吃，餐桌上也多了许多意见。',['grandparent'])]),
D('preg_expect','亲戚说胎教要趁早，购物车里塞满了课程。','智力 / 音乐 / 家庭氛围',[
O('每天听一会儿音乐，一起散步',{energy:-5,music:10,bond:5},'回家的路上，你们给还没出生的孩子讲了一件小事。'),
O('购买系统胎教课程',{money:-12,iq:7,music:8},'你认真记了笔记，课程结束后却发现最难的是每天都留出时间。',['paid_course']),
O('多睡觉，按自己的节奏生活',{energy:8,fitness:6,iq:-2},'播放器落了一层灰，窗帘每天按时拉开。'),
O('把时间用在学习育儿知识上',{energy:-8,selfD:7,marriage:4},'你们没统一所有观点，但先约定了有争执时不要当着孩子吵。')]),
D('family_plan','饭后，有人问起以后要不要第二个孩子。','经济 / 家庭关系 / 精力',[
O('先照顾好眼前这一个',{money:5,marriage:5,energy:-4},'你合上远期预算，先把婴儿床的位置腾了出来。',['one_child']),
O('认真为二胎留一份预算',{money:-12,marriage:8,energy:-4},'你们在纸上留下第二栏，也约好到时候重新征求每个人的意见。',['second_child_plan']),
O('先把双方职业安排谈清楚',{energy:-9,marriage:10,money:3},'那次谈话不轻松，却第一次谈到了谁的工作也不该被理所当然地放弃。',['teamwork']),
O('暂时不谈，先忙工作',{money:9,marriage:-7,energy:-5},'话题停在饭桌边，那个问题没有消失，只是被往后放了放。')])],events:[]},
{ id:'toddler',title:'0~3 岁 · 婴幼儿',ageLabel:'0~3 岁',art:art('toddler'),
intro:'你已经能从哭声里分辨出几种不同的意思，却仍会在凌晨三点怀疑自己的判断。奶瓶、尿布和工作消息挤在同一张桌上。孩子扶着沙发站起来的时候，全家人都停下了手里的事。可日子并不只由这样的片刻组成，更多时候，是谁先去睡，谁再撑一会儿。',
decisions:[
D('feeding','喂养总被比较，家里有人坚持按表，有人坚持按需。','体质 / 精力 / 家庭关系',[
O('咨询专业人员，按实际情况调整',{money:-8,fitness:9,marriage:5},'你把建议贴在冰箱上，争论终于有了一张可以一起看的纸。'),
O('家长轮流记录，及时观察',{energy:-12,fitness:8,bond:5},'半夜那一行字写得歪歪扭扭，旁边有人补了一句“今天精神不错”。'),
O('请长辈沿用熟悉的办法',{energy:9,marriage:-5,fitness:2},'你多睡了一个小时，也得挑个不伤人的时机重新讨论细节。'),
O('简化流程，先保证大人休息',{energy:12,selfD:-3,mind:5},'你们放弃了精确到分钟的表格，屋里少了几次争执。')]),
D('care','假期结束了，白天谁带孩子成了最现实的问题。','经济 / 精力 / 亲子',[
O('家长调整工作，亲自轮流带',{money:-14,energy:-8,bond:12},'孩子学会的新词，你们终于都听到了第一次。',['hands_on']),
O('请长辈照顾，晚上固定陪伴',{energy:-6,money:5,bond:4,marriage:-3},'视频里孩子朝门口看了好几回，你把晚上的半小时认真留了下来。',['grandparent']),
O('选择正规托育服务',{money:-18,energy:9,selfD:6},'第一次交接时孩子攥住你的袖口，第三周已能自己走进去。',[],{require:{money:18}}),
O('一位家长独自承担大部分照料',{money:5,energy:-14,bond:9,marriage:-8},'相册里几乎都是同一个人拍的照片，另一个人常常只出现在电话那头。',['solo_care'])]),
D('early_play','早教机构发来试听邀请，邻居说不能输在起点。','智力 / 体质 / 音乐',[
O('报亲子音乐活动',{money:-12,music:13,bond:4},'孩子把拍子全打乱了，却在回家路上哼了一小段。',['paid_course']),
O('每天在公园自由跑跳',{energy:-8,sports:13,fitness:6},'鞋底带回来一小片泥，你没有立刻责备。'),
O('积木和绘本，由孩子挑',{energy:-8,iq:9,coding:6},'积木塔倒下后，孩子又认真搭了一次。'),
O('暂时不安排，给彼此喘口气',{energy:10,iq:-3,mind:6},'客厅安静了一会儿，你们一起看了很久窗外的树。',['free_range'])]),
D('toddler_rules','孩子在商场地上哭着不肯走，旁边已经有人看过来。','自律 / 压力 / 亲子',[
O('蹲下来等情绪过去，再说规则',{energy:-10,selfD:9,bond:6},'回家时嗓子还是哑的，但孩子愿意牵着你的手。'),
O('立刻买下玩具，先离开现场',{money:-8,mind:4,selfD:-5},'哭声停了，你却知道下次还得认真谈一次。'),
O('严厉要求马上站起来',{selfD:9,stress:9,bond:-7},'孩子站起来了，回程一路没再开口。',['pressure']),
O('带到安静处，约定下次选择',{energy:-6,selfD:6,rebellion:3,bond:5},'孩子说还想要，你说听见了，然后一起离开。')])],events:[]},
{ id:'kindergarten',title:'3~6 岁 · 幼儿园',ageLabel:'3~6 岁',art:art('kindergarten'),
intro:'入园那天，你在门外站得比预计久得多。家长群开始闪烁，照片里孩子坐在小椅子上，像一个终于有了自己行程的人。有人讨论双语，有人分享识字表，你也难免把那些消息一条条读完。可孩子放学后最想告诉你的，是今天有谁愿意和自己一起玩。',
decisions:[
D('garden','公立园要摇号，私立园有名额，双语园还有“衔接方案”。','经济 / 英语 / 家庭精力',[
O('接受公立摇号，准备备用方案',{energy:-8,money:5,selfD:5},'你把材料按顺序装袋，也记下了没摇中时可以去的地方。'),
O('选择近家的普惠园',{money:-7,energy:7,bond:5},'每天少走的那段路，后来成了你们一起看落叶的时间。'),
O('选择双语私立园',{money:-20,academic:{english:12},stress:4},'孩子带回一首英文歌，你把下一期缴费日期写得格外醒目。',['private_school'],{require:{money:20}}),
O('为通勤便利租住园所附近',{money:-14,energy:10,marriage:3},'新屋小了一点，早晨终于不用一路催促。')]),
D('first_interest','试听课结束，孩子对三间教室都说“还想来”。','音乐 / 体育 / 编程',[
O('让孩子试着学音乐',{money:-10,music:15,selfD:3},'第一首曲子只弹了几个音，孩子郑重地请你坐好听。',['music_path']),
O('选择游泳和球类启蒙',{money:-9,sports:15,fitness:4},'毛巾裹着湿头发，孩子一路讲今天终于敢松开池边。',['sports_path']),
O('选择积木与逻辑游戏',{energy:-9,coding:14,iq:5},'你没替孩子拼完最后一块，只在旁边等。',['coding_path']),
O('不急着定方向，多去户外',{energy:-7,mind:8,music:3,sports:5,academic:{math:-2}},'报名表没交，周末却有了好几条新的散步路线。',['free_range'])]),
D('head_start','群里已有孩子学完一年级，你要不要提前教？','学业 / 心理 / 自律',[
O('每天短时间读绘本、数东西',{energy:-8,academic:{chinese:7,math:6},bond:4},'孩子拿着菜单认字，认错时你们一起笑了。'),
O('报集中幼小衔接',{money:-14,academic:{chinese:10,math:10},mind:-5,stress:7},'作业本写得很满，原本讲睡前故事的时间短了一些。',['tutoring','pressure']),
O('专注收拾书包和表达需求',{energy:-6,selfD:11,mind:5,academic:{math:-2}},'开学前，孩子第一次自己检查了水壶。'),
O('完全不提前安排',{energy:8,mind:8,academic:{chinese:-4,math:-3}},'你没有打印练习纸，也答应开学后遇到困难一起想办法。',['free_range'])]),
D('garden_friend','孩子说不想去幼儿园，因为总分不到那盒彩笔。','亲子 / 叛逆 / 家庭关系',[
O('先听完，再和老师核实',{energy:-9,bond:10,selfD:4},'原来孩子最介意的不是彩笔，是别人说“你不会画”。'),
O('教孩子自己开口争取',{energy:-6,rebellion:5,selfD:8},'第二天孩子还是紧张，却试着把那句话说了出来。'),
O('买同款彩笔，让事情过去',{money:-7,mind:5,selfD:-3},'新彩笔很漂亮，孩子仍把旧班级照片翻出来看。'),
O('要求别为小事影响上学',{selfD:6,bond:-8,stress:6},'孩子点了头，后来讲学校的事少了一点。',['pressure'])])],events:[]},
{ id:'primary_low',title:'6~8 岁 · 小学低段',ageLabel:'6~8 岁',art:art('primary_low'),
intro:'书包比幼儿园时沉了许多，客厅的一角变成了固定书桌。你开始习惯在晚饭后检查作业，也开始听见“别人家长不是这样的”。分数第一次有了清晰的刻度，睡眠、兴趣和相处却没有。你每天做的都是小决定，只是它们逐渐连成了这个家的日常。',
decisions:[
D('housing','房产中介发来学区房信息，首付几乎等于全部积蓄。','经济 / 学业 / 家庭关系',[
O('咬牙换房，承担长期供款',{money:-20,marriage:-6,academic:{chinese:8,math:8,english:8}},'签完字，你把钥匙放在桌上，谁也没急着庆祝。',['school_house','mortgage'],{require:{money:20}}),
O('留在现住处，认真了解本校',{energy:-10,selfD:6,academic:{chinese:4,math:4}},'校园没有宣传册上气派，班主任却记住了孩子的名字。'),
O('租住近校小房，减少接送',{money:-12,energy:10,bond:4},'旧家具暂时放不下，晚饭倒是能一起吃完了。'),
O('把预算留给生活和长期储备',{money:9,mind:5,academic:{english:-3}},'你没有去看样板间，周末带孩子重新认识了附近的图书馆。')]),
D('homework','一道应用题讲了三遍，孩子还低着头不动笔。','数学 / 精力 / 亲子',[
O('换一种讲法，明天再巩固',{energy:-12,academic:{math:10},bond:5},'你拿出几颗豆子，孩子终于说“原来是这个意思”。'),
O('报课后辅导，让专业老师讲',{money:-13,academic:{math:12},stress:5},'作业完成得快了，回家的天色却更晚。',['tutoring']),
O('要求独立完成，不做完不睡',{selfD:9,academic:{math:8},mind:-7,stress:10},'答案终于写出来了，第二天早餐桌上却接连打哈欠。',['pressure']),
O('先休息，只保留基础任务',{energy:6,mind:8,academic:{math:-3}},'你把剩下的题折过去，第二天向老师说明了情况。')]),
D('routine','新学期只够长期坚持一项课外安排。','兴趣 / 自律 / 学业',[
O('继续音乐，每天短练',{money:-10,music:15,selfD:5},'练习本上画了一排小格子，孩子自己勾掉了第一天。',['music_path']),
O('固定运动，保证睡眠',{energy:-8,sports:15,fitness:7},'球衣晾在阳台，晚上的灯比以前早灭了一点。',['sports_path']),
O('参加校内编程社团',{energy:-8,coding:15,academic:{math:6}},'屏幕上的小角色第一次按孩子写的指令走到了终点。',['coding_path']),
O('多读书，暂缓付费兴趣班',{energy:-7,academic:{chinese:10,english:5},music:-3},'借书证用旧了，书包侧袋里常常塞着一本没看完的书。')]),
D('parent_group','班级志愿活动需要人，工作日又正好有会。','家庭关系 / 精力 / 经济',[
O('两位家长轮流参加',{energy:-8,marriage:10,bond:4},'签到表上第一次不只出现同一个名字。',['teamwork']),
O('自己请假去，别让孩子失望',{energy:-13,bond:9,money:-3},'孩子在队伍里看见你，举手举得格外高。',['solo_care']),
O('提前解释，晚上一起补做活动',{energy:-6,money:6,bond:3},'孩子失落了一会儿，回家后仍把材料摆到了桌上。'),
O('优先工作，请亲友代为到场',{money:10,bond:-5,marriage:-3},'照片里孩子站在亲友身边，你在散会后才看到那张照片。',['overtime'])])],events:[]},
{ id:'primary_mid',title:'8~10 岁 · 小学中段',ageLabel:'8~10 岁',art:art('primary_mid'),
intro:'你在一次家长会后把成绩单折成很小的一张，放进外套口袋。孩子已经会察言观色，回家路上先讲同桌的笑话，再问你有没有生气。题目变难，朋友变重要，手机也不再只是大人的东西。你忽然意识到，自己正在学习一种新的本领：不把每次担心都说成命令。',
decisions:[
D('math_english','奥数班和英语班都说现在是关键期，时间却只够一边。','数学 / 英语 / 压力',[
O('选数学拓展，控制练习量',{money:-12,academic:{math:13},iq:5,stress:4},'孩子第一次对一道题说“再让我想一会儿”。',['tutoring']),
O('选英语阅读，不追逐证书',{money:-11,academic:{english:14},selfD:4},'你们开始给书里的角色配音，错音也先让故事讲完。',['tutoring']),
O('两门都加，把周末排满',{money:-19,energy:-9,academic:{math:15,english:15},mind:-10,stress:12},'课表贴上墙后，孩子问周日还能不能去同学家。',['tutoring','pressure'],{require:{money:19}}),
O('用校内资源补基础',{energy:-10,academic:{math:7,english:7},bond:4},'你和老师约定了更小的目标，冰箱上只贴了本周的三件事。')]),
D('devices','孩子想要一台自己的平板，说同学都有。','编程 / 自律 / 亲子',[
O('共同定时段，学习和娱乐都允许',{money:-10,selfD:9,coding:10,bond:4},'孩子在协议下签了名字，也要求你吃饭时别看手机。'),
O('只开放编程与学习软件',{money:-9,coding:15,stress:5,bond:-3},'作品保存得越来越多，孩子也开始问为什么不能自己选。',['coding_path']),
O('先借用家里的设备，共同使用',{energy:-8,coding:8,bond:7},'你坐在旁边看了一局游戏，终于弄懂孩子为什么那么着急。'),
O('完全交给孩子管理',{energy:9,coding:4,selfD:-8,stress:-4},'晚上屏幕偶尔亮得很晚，你决定下次先谈睡眠。',['free_range'])]),
D('middle_interest','兴趣课遇到瓶颈，孩子说“学不会就算了”。','音乐 / 体育 / 自律',[
O('陪着拆小目标，继续音乐',{energy:-10,music:15,selfD:6},'整首曲子仍不流畅，但那两小节终于不再停顿。',['music_path']),
O('换成校队训练，尝试运动',{energy:-9,sports:15,fitness:5},'孩子第一次带着酸痛的腿，兴奋地讲完一整场比赛。',['sports_path']),
O('允许换到编程项目',{money:-10,coding:15,iq:4},'旧乐谱收进抽屉，新项目的第一行字却写了好久。',['coding_path']),
O('暂缓考级，把时间还给阅读',{music:-5,academic:{chinese:11},mind:8},'晚饭后不再赶路，孩子把想读的书摞到了床边。')]),
D('first_rank','第一次排名靠后，老师让你签字。','学业 / 心理 / 亲子',[
O('一起分析失误，约定小目标',{energy:-10,academic:{chinese:7,math:7,english:7},selfD:5},'你签名之前，先让孩子把最不懂的那道题圈了出来。'),
O('拿邻居家的成绩做比较',{academic:{math:9,english:8},mind:-8,bond:-9,stress:10},'孩子拿着笔站了很久，最后只说了一句“知道了”。',['pressure']),
O('先安抚情绪，再向老师求助',{energy:-7,mind:10,bond:8,academic:{math:3}},'那天成绩单没有立刻收走，孩子终于讲了考试时的慌张。'),
O('不再关注这次成绩',{energy:8,mind:6,selfD:-5,academic:{chinese:-3}},'签名很快，孩子轻松了一些，也有点不确定以后该找谁商量。',['free_range'])])],events:[]},
{ id:'primary_high',title:'10~12 岁 · 小升初',ageLabel:'10~12 岁',art:art('primary_high'),
intro:'书桌上多了初中的招生简章，家长群的消息开始带着倒计时。你收集过竞赛名单，也向熟人打听过摇号，直到孩子问起“我会不会和朋友分开”。身高在不知不觉里追上了你，体检单上的几项提醒却没有那么轻。你要选择下一所学校，也要决定怎样走过这段路。',
decisions:[
D('admission','民办摇号和就近入学都能报名，资料截止就在下周。','经济 / 精力 / 自律',[
O('核实政策，按规则报名摇号',{energy:-10,selfD:6,academic:{english:4}},'材料交出去后，你们照常吃饭，没有再每天刷新群消息。'),
O('选择就近公办，把精力留给适应',{money:7,bond:6,academic:{math:-2}},'孩子骑车试了一次上学路线，回家时脸被风吹得发红。'),
O('选择收费更高的寄宿学校',{money:-20,selfD:12,bond:-7,stress:5},'宿舍床铺收拾好了，你在返程路上盯了很久手机。',['boarding'],{require:{money:20}}),
O('搬到更便利的片区，接受空间变小',{money:-14,energy:8,marriage:5},'家具重新量过尺寸，晚饭后仍留得下一张能一起坐的桌子。')]),
D('competition_list','有人推销“升学竞赛证书”，宣传页说名额所剩不多。','编程 / 学业 / 经济',[
O('只核实白名单，参加真正感兴趣的项目',{energy:-10,coding:15,iq:5},'你划掉了几项宣传语，孩子留下了那个真的想做的程序。',['coding_path']),
O('不买证书，把预算用于音乐训练',{money:-12,music:15,selfD:4},'没有新的奖状，排练结束后却多了一次像样的演出。',['music_path']),
O('选择校内体育活动',{energy:-8,sports:15,fitness:5},'队服并不合身，孩子还是认真把号码整理平了。',['sports_path']),
O('暂时停止竞赛，补语数外基础',{coding:-4,academic:{chinese:9,math:9,english:9},energy:-8},'桌面上少了报名表，多了一本按错因分好的练习本。')]),
D('health','视力和体能检查带来提醒，作业却仍每天排满。','体质 / 压力 / 学业',[
O('每天运动，砍掉重复练习',{energy:-7,fitness:12,sports:8,academic:{math:-3}},'孩子跑完步回家，第一次主动说今天想早睡。'),
O('体检复查，调整桌椅和作息',{money:-9,fitness:10,mind:5},'你把台灯移了位置，也把自己的手机从餐桌上拿走了。'),
O('先应付升学，之后再补',{academic:{math:10,english:8},fitness:-9,stress:9},'体育鞋停在门后，鞋带很久没有重新系过。',['pressure']),
O('周末全家去户外',{energy:-10,marriage:8,bond:7,fitness:7},'那天没人带练习册，回家时每个人都累得很踏实。')]),
D('graduation','毕业前，孩子想和同学办一次小聚会。','亲子 / 自律 / 学业',[
O('帮忙协调，活动由孩子组织',{energy:-8,selfD:8,bond:8},'孩子写了分工表，你被安排负责最后的接送。'),
O('办简单的音乐分享会',{money:-8,music:12,bond:5},'平时练不顺的那一段，孩子这次在朋友面前弹完了。',['music_path']),
O('约一场球赛，再一起收拾场地',{energy:-7,sports:12,selfD:5},'比分忘得很快，合照倒是被孩子认真保存了。',['sports_path']),
O('用这段时间提前学初中内容',{energy:-8,academic:{math:12,english:8},mind:-5,bond:-5},'新课提前翻了好几页，聚会照片后来才从同学那里收到。',['pressure'])])],events:[]},
{ id:'junior_1',title:'12~13 岁 · 初一',ageLabel:'12~13 岁',art:art('junior_1'),
intro:'新课表像一张不断扩大的地图，孩子每天把不一样的课本塞进书包。你还能看懂题目，却越来越难看懂沉默。有时关门只是想安静，有时一句顶嘴后面藏着委屈。你开始在睡前听见房间里的键盘声，也开始犹豫：敲门之前，该先把自己的担心说得轻一点吗。',
decisions:[
D('boarding_choice','上学路远，要不要寄宿？孩子说想试一试。','经济 / 自律 / 亲子',[
O('寄宿，但固定每周认真通话',{money:-12,selfD:11,bond:-3},'第一次电话只有三分钟，后来孩子会主动多讲一些。',['boarding']),
O('坚持走读，轮流接送',{energy:-13,bond:9,marriage:3},'车窗外的路每天一样，你偶尔听见了学校里真正发生的事。'),
O('近校租房陪读',{money:-18,energy:-8,academic:{math:9,english:8},bond:4},'房间只够放两张桌子，你们约好各忙各的也不算冷落。',['accompany'],{require:{money:18}}),
O('教孩子独立通勤，保持联系',{energy:-5,selfD:10,rebellion:4},'第一次独自到站的短信很短，你却来回读了两遍。')]),
D('new_subjects','科目一下多了，孩子不知道先复习哪一门。','学业 / 自律 / 压力',[
O('一起做周计划，预留空白',{energy:-10,selfD:10,academic:{history:8,biology:8,geography:8}},'计划表上留下了一格“没做完也可以挪”，孩子认真画了线。'),
O('重点补数学英语',{money:-14,academic:{math:14,english:12},stress:6},'两科稳了一些，孩子开始担心别的科目落下。',['tutoring']),
O('培养阅读与表达，打通文科基础',{energy:-9,academic:{chinese:12,history:10,politics:8}},'新闻里的地名第一次和课本连在了一起。'),
O('让孩子自行试错一个月',{energy:9,selfD:4,academic:{math:-4,english:-3},bond:5},'第一次安排得很乱，你们约好月末一起复盘。',['free_range'])]),
D('junior_club','社团招新，孩子拿回来三张报名表。','兴趣 / 学业 / 精力',[
O('继续编程，完成一个小作品',{energy:-9,coding:15,iq:6,academic:{physics:6}},'程序仍有错误，孩子却第一次把自己的作品给同学试玩。',['coding_path']),
O('参加合唱与器乐社',{money:-10,music:15,mind:5},'演出前的后台很挤，孩子隔着人群向你挥了挥手。',['music_path']),
O('参加校队，学会安排训练',{energy:-9,sports:15,fitness:6,selfD:3},'训练服上沾着汗，作业也第一次由孩子自己提前写完。',['sports_path']),
O('只保留学习小组',{energy:-7,academic:{math:10,english:10,physics:8},mind:-3},'社团表交回去两张，孩子把剩下的时间排得很满。')]),
D('privacy','孩子开始锁日记，也不愿让你翻聊天记录。','亲子 / 叛逆 / 自律',[
O('尊重隐私，约定安全边界',{energy:-6,bond:11,selfD:5,rebellion:3},'孩子没有交出密码，但主动告诉了你一次不舒服的聊天。'),
O('要求交密码，随时抽查',{selfD:8,bond:-12,rebellion:12,stress:7},'你看到了聊天记录，却越来越少听到孩子主动讲述。',['pressure']),
O('请老师侧面关注，暂缓谈话',{energy:-7,mind:5,bond:-3},'老师说孩子在学校还好，你决定找一个不赶时间的晚上。'),
O('完全不问，让孩子自己处理',{energy:10,bond:3,selfD:-6,rebellion:4},'门关上后很安静，你也开始练习在必要时开口。',['free_range'])])],events:[]},
{ id:'junior_2',title:'13~14 岁 · 初二',ageLabel:'13~14 岁',art:art('junior_2'),
intro:'初二的试卷第一次让孩子在饭桌上红了眼眶。你以为是数学，后来才知道还牵涉座位、朋友和一句没被听懂的话。班主任说这是分化的时候，家长群里有人发来昂贵的一对一课程。你一边计算能承受多久，一边发现那个曾经什么都问你的孩子，已经会说“你不懂”。',
decisions:[
D('math_fall','数学掉到及格线附近，班主任建议补基础。','数学 / 心理 / 经济',[
O('咬牙报针对性一对一',{money:-15,energy:-8,academic:{math:15},mind:-5,stress:8},'你把缴费单塞进抽屉最底下。孩子路过时，脚步快了一点。',['tutoring']),
O('家长每晚陪着整理错题',{energy:-15,academic:{math:11},bond:6,stress:4},'第三周你先打了瞌睡。孩子反过来给你倒了杯水。'),
O('争取学校老师的答疑时间',{energy:-7,academic:{math:8},bond:4},'老师说放学后可以留一会儿，你把接送时间向后改了半小时。'),
O('先恢复状态，降低这次目标',{academic:{math:-4},mind:12,stress:-13,rebellion:-6},'你第一次在家长群里保持沉默。那晚全家九点就熄了灯。')]),
D('relationship','孩子和一个同学走得很近，班主任委婉提醒。','亲子 / 自律 / 压力',[
O('谈尊重与边界，不替孩子定性',{energy:-9,bond:11,selfD:5,stress:-3},'孩子问你年轻时有没有喜欢过谁，你停了一会儿才回答。'),
O('要求断绝往来并检查手机',{selfD:7,bond:-13,rebellion:15,stress:9},'通讯录里名字不见了，孩子也学会把通知藏起来。',['pressure']),
O('商量考试季的时间安排',{energy:-7,selfD:10,academic:{chinese:5},rebellion:3},'对话没有达成所有共识，但晚自习后的时间有了约定。'),
O('请信任的老师共同沟通',{energy:-8,mind:7,bond:4,marriage:-2},'老师先问了孩子想法，你在旁边忍住了几次插话。')]),
D('bio_geo','生地学业水平考试临近，其他科目也不能丢。','生物 / 地理 / 学业',[
O('集中整理生地知识框架',{energy:-10,academic:{biology:15,geography:15},stress:4},'墙上的地图多了几张便签，孩子能把零散的点串起来了。'),
O('请老师带着查缺补漏',{money:-12,academic:{biology:12,geography:12},selfD:4},'错题数量终于少了一点，你们没有再加第二套练习。',['tutoring']),
O('兼顾数理，生地保持基础',{energy:-9,academic:{math:10,physics:12,biology:4,geography:4}},'计划并不漂亮，但每一门都留了一点能做下去的空间。'),
O('先补睡眠，接受部分失分',{mind:10,fitness:7,stress:-9,academic:{biology:-4,geography:-4}},'孩子睡醒后说，今天看书终于没那么像隔着一层雾。')]),
D('junior_passion','一周里仅剩的空闲，你愿意保留什么？','兴趣 / 心理 / 学业',[
O('音乐，留一段无需考试的时间',{money:-10,music:15,mind:7},'琴声停下来时，孩子终于愿意讲讲最近的烦心事。',['music_path']),
O('体育训练，让身体动起来',{energy:-8,sports:15,fitness:7,stress:-4},'球场上的输赢没有带回饭桌，孩子多吃了半碗饭。',['sports_path']),
O('编程项目，认真准备正规竞赛',{energy:-12,coding:15,iq:7,stress:4},'孩子把失败测试也保存了，说这次知道哪里不对了。',['coding_path']),
O('全部用于主科学习',{energy:-10,academic:{chinese:10,math:12,english:10},mind:-7,stress:9},'课表上最后一块空白被填上了，你们都没再提周末。',['pressure'])])],events:[]},
{ id:'junior_3',title:'14~15 岁 · 初三·中考',ageLabel:'14~15 岁',art:art('junior_3'),
intro:'教室后面的倒计时一天少一页，你的手机里保存了几张不同学校的分数表。关于普通高中和职业教育的讨论，终于从新闻变成了要填的志愿。孩子夜里会问“没考好怎么办”，你发现这句话很难用一个分数回答。眼前的路会分开，但谁也不能提前替十八岁之后的人生画句号。',
decisions:[
D('zhongkao_sprint','距离中考还有一段时间，要怎样安排最后冲刺？','主科 / 心理 / 精力',[
O('围绕错题稳步复习',{energy:-12,academic:{chinese:12,math:14,english:12},selfD:5},'你们把资料减到几本，桌面终于不再像临时仓库。'),
O('高强度集训，争取更高一档',{money:-18,academic:{chinese:15,math:15,english:15,physics:12},mind:-12,stress:15},'模拟分数上来了，孩子却开始在考前反复去洗手间。',['tutoring','pressure'],{require:{money:18}}),
O('校内节奏为主，保证睡眠',{energy:-5,mind:10,fitness:6,academic:{math:7,english:7,chinese:7}},'你不再每晚问分数，孩子开始主动说今天弄懂了什么。'),
O('先照顾情绪，保留继续学习的路',{academic:{math:-5},mind:14,bond:10,stress:-14},'你们认真看了不止一条升学路线，那晚孩子终于把饭吃完。')]),
D('zhongkao_choice','志愿说明会上，你要和孩子怎样排学校？','自律 / 家庭关系 / 压力',[
O('一起核实梯度和保底',{energy:-10,selfD:9,bond:6},'孩子在表格上写下自己的排序，你们挨个问清了条件。'),
O('只冲名校，愿意承担落差',{academic:{math:9,english:8},stress:12,mind:-7},'最高的一栏被圈得很重，保底的空白让你夜里又醒了一次。',['pressure']),
O('优先通勤和适应程度',{money:-5,mind:8,bond:6,academic:{physics:-2}},'那所学校没那么有名，孩子却记住了操场和图书馆的位置。'),
O('认真考察职教与对口升学',{energy:-9,selfD:7,mind:7,academic:{english:-2}},'实训教室的机器声很响，你们终于有了宣传页之外的印象。',['vocational_informed'])]),
D('hukou','报名材料要复核，工作城市与户籍地并不完全一致。','经济 / 精力 / 家庭关系',[
O('提前核实资格，补齐材料',{energy:-13,marriage:5,selfD:4},'复印件装满一袋，窗口老师最后说了一句“齐了”。',['eligibility_checked']),
O('为后续稳定升学调整工作',{money:-15,marriage:8,bond:6},'收入少了一截，下一学年的安排终于有了确定的地址。',['eligibility_checked']),
O('回符合资格的地区衔接',{money:-10,mind:-4,academic:{history:7,politics:7},bond:5},'旧课本和新教材放在一起，孩子给原来的同学写了一封信。',['eligibility_checked']),
O('请假反复咨询，暂缓其他投入',{energy:-15,money:4,stress:5,selfD:5},'电话记录拉了很长，重要条件终于一条条有了书面答复。',['eligibility_checked'])]),
D('last_junior_week','考试前一周，孩子问能不能停一次练习。','心理 / 学业 / 亲子',[
O('一起散步，练习量减半',{energy:-6,mind:11,stress:-12,bond:7,academic:{math:-2}},'路灯一盏盏亮起，孩子说今晚想自己收拾考具。'),
O('坚持完成模拟，但不再追问排名',{energy:-8,academic:{chinese:8,math:8,english:8},stress:4},'卷子订好后，你只问了明天几点出门。'),
O('再加一轮押题',{money:-12,academic:{math:12,physics:10},mind:-8,stress:12},'最后一道题做到很晚，孩子握笔的手迟迟没松开。',['tutoring','pressure']),
O('保留最喜欢的一项活动',{energy:-6,music:7,sports:7,coding:7,mind:8},'那一个小时很短，孩子出来时肩膀却没有那么绷着了。')])],events:[]},
{ id:'senior_1',title:'15~16 岁 · 高一·选科',ageLabel:'15~16 岁',art:art('senior_1'),
intro:'新校服还带着折痕，黑板上的题却已经比想象中远了一步。你们开始讨论选科，第一次要把兴趣、能力和未来专业放在同一张纸上。别人家的组合很容易听起来更稳妥，可真正要背着书包走进那些课堂的人是孩子。你能做的是一起看清代价，再给选择留下一份认真的理由。',
decisions:[
D('senior_adapt','高中第一轮考试不理想，孩子说自己跟不上。','学业 / 心理 / 自律',[
O('找老师分析，先建立学习节奏',{energy:-10,selfD:10,academic:{chinese:8,math:10,english:8}},'问题被拆成一张小清单，孩子终于知道明天从哪里开始。'),
O('报晚间补习，尽快补差',{money:-17,academic:{math:15,english:12},mind:-6,stress:8},'书包里多了两本讲义，晚饭常常只来得及吃几口。',['tutoring'],{require:{money:17}}),
O('先恢复睡眠和同伴支持',{energy:-7,mind:12,bond:7,academic:{math:3}},'孩子愿意再去问一次同桌，那道题没有想象中那么难开口。'),
O('提高要求，紧盯每日完成量',{academic:{math:12,physics:10},selfD:7,bond:-9,stress:12},'表格上的格子越来越满，聊天却越来越像一次检查。',['pressure'])]),
D('subject_pick','选科确认表需要签字：先选物理或历史，再选两门。','科目组合 / 专业方向',[
O('一起确认兴趣与能力',{energy:-8,selfD:5,bond:6},'签字之前，你让孩子把选择理由念了一遍。你也认真听完了。')],{kind:'subjects'}),
D('senior_interest','高中仍留得下一条特长线，但要明确投入边界。','特长 / 学业 / 精力',[
O('编程竞赛，阶段考核后再决定',{money:-12,coding:15,iq:7,stress:5},'训练计划最后写着复盘日期，你们没有许诺奖项。',['coding_path']),
O('音乐训练，同时保留文化课',{money:-14,music:15,academic:{chinese:5},stress:3},'琴谱与课本放在同一个书架，哪一边也没被轻易扔下。',['music_path']),
O('体育专项，认真记录伤病与成绩',{energy:-11,sports:15,fitness:9},'教练让孩子先学会热身，计时器并不是每天都按。',['sports_path']),
O('暂停竞赛考级，稳住六科',{coding:-4,music:-3,sports:-3,academic:{chinese:10,math:10,english:10},selfD:5},'报名消息被归进文件夹，孩子留了一张以后还想再试的便签。')]),
D('senior_class','分班之后，孩子觉得周围每个人都比自己强。','心理 / 学业 / 压力',[
O('不谈名次，记录个人进步',{energy:-8,mind:10,selfD:6,bond:5},'你们把上次不会的题放在一起，终于看见了一点走过的路。'),
O('争取更强班级，接受更高压力',{energy:-10,academic:{math:12,physics:10,history:10},stress:12,mind:-6},'新教室离楼梯更远，孩子每天都提前一点到。',['pressure']),
O('保留朋友与运动时间',{energy:-7,mind:8,fitness:8,sports:6,academic:{english:-2}},'操场跑完两圈后，孩子愿意回去把今天那一页翻开。'),
O('减少家长干预，让孩子自行调整',{energy:10,bond:5,selfD:-4,academic:{math:-2}},'你把学习软件的通知关掉了，约好两周后再一起看。',['free_range'])])],events:[]},
{ id:'senior_2',title:'16~17 岁 · 高二',ageLabel:'16~17 岁',art:art('senior_2'),
intro:'高二似乎没有一个显眼的终点，疲惫却比任何一年都具体。孩子可能想换一门科，也可能开始认真考虑音乐、体育或竞赛。你们拿着课程表重新计算，发现所谓选择往往意味着放下别的可能。晚饭时，你想问成绩，最后先问了今天累不累。孩子抬头看了你一下。',
decisions:[
D('transfer','选科适应已有一段时间，这是唯一一次转科申请机会。','新科能力 / 精力 / 心理',[
O('保持现有组合，继续打基础',{energy:-5,selfD:6,academic:{chinese:3,math:3,english:3}},'你们把已经做过的练习重新翻了一遍，决定先往下走。'),
O('申请更换一门科目',{energy:-20,mind:-10,selfD:3},'旧课本没有扔，新科目的补课清单却已经排到了周末。',['subject_transferred'])],{kind:'transfer'}),
D('route','明年的主要升学路线，今天要做一次认真选择。','升学路线 / 特长 / 文化课',[
O('普通高考，集中六科',{energy:-10,selfD:8,academic:{chinese:9,math:9,english:9}},'桌上留下最常用的几本书，你们决定先把眼前的路走稳。',['route_general']),
O('艺术路线，同时准备文化与专业考核',{money:-18,music:15,mind:-3,stress:5},'专业老师先谈了差距，再谈训练；你们没有把文化课停掉。',['route_art'],{require:{money:18}}),
O('体育路线，核实专项与报考条件',{energy:-14,sports:15,fitness:7,academic:{english:-3}},'训练日志开始记录身体反应，也记下了文化课复习的时间。',['route_sports']),
O('竞赛路线，接受资格与阶段淘汰',{money:-15,coding:15,iq:8,stress:10,mind:-4},'报名之前，你们看了退出方案。孩子说想认真试一次。',['route_competition'])],{kind:'route'}),
D('deep_study','薄弱科目开始拖累总分，该怎样分配时间？','六科 / 自律 / 压力',[
O('按组合查缺补漏，限制重复刷题',{energy:-12,selfD:7,academic:{chinese:9,math:10,english:9},selectedGain:12},'每门课只留下最需要解决的几个问题，书包竟轻了一点。'),
O('请老师做针对性训练',{money:-16,academic:{chinese:10,math:13,english:12},selectedGain:13,stress:7},'老师圈掉了半叠资料，留下的题反而要讲得更细。',['tutoring'],{require:{money:16}}),
O('减量休整，先处理厌学情绪',{academic:{math:-4},mind:15,stress:-15,bond:8},'你没有在那个晚上追问计划，孩子第二天自己拿出了书。'),
O('拉长学习时间，短期冲刺',{energy:-14,academic:{chinese:13,math:15,english:13},selectedGain:15,mind:-12,stress:15},'台灯亮到很晚，孩子开始反复读同一行字。',['pressure'])]),
D('senior_conflict','孩子关上门说“不想再学了”，饭已经热了两遍。','心理 / 亲子 / 家庭关系',[
O('先听，允许一起寻求专业支持',{money:-10,mind:15,bond:12,stress:-12},'门开了一条缝。你把饭放下，没有马上拿出成绩单。'),
O('家人轮流陪伴，减少互相指责',{energy:-13,marriage:10,mind:10,bond:8},'晚饭没有讨论升学，每个人讲了一件最近难熬的事。',['teamwork']),
O('强调责任，要求按原计划完成',{selfD:9,academic:{math:7},mind:-10,bond:-12,rebellion:12},'孩子把门打开了，却只在你面前摊开作业。',['pressure']),
O('暂时各自安静，约好明晚再谈',{energy:6,mind:7,bond:-3,stress:-6},'你们把谈话时间写在纸上，第二天没有再假装事情没发生。')])],events:[]},
{ id:'senior_3',title:'17~18 岁 · 高三·高考',ageLabel:'17~18 岁',art:art('senior_3'),
intro:'高三的日子被试卷和饭盒分成很小的片段，窗外的季节却照常往前走。你逐渐学会不在每次模拟考后立刻追问，也仍会在夜里偷偷打开分数表。孩子已快成年，志愿表上的城市有的离家很远。你开始明白，陪着走到考场门口之后，还要学会把剩下的路交还给孩子。',
decisions:[
D('gaokao_sprint','最后冲刺，你们把哪件事放在最前面？','六科 / 心理 / 压力',[
O('稳节奏、补漏洞、留睡眠',{energy:-12,academic:{chinese:12,math:13,english:12},selectedGain:12,selfD:5},'墙上的计划只写到这一周，完成后就按时关灯。',['sprint_balanced']),
O('冲更高目标，加一轮密集训练',{money:-18,energy:-12,academic:{chinese:15,math:15,english:15},selectedGain:15,mind:-14,stress:18},'模拟分数让人振奋，孩子握笔的手却常常停在半空。',['tutoring','pressure','sprint_pressure'],{require:{money:18}}),
O('心理恢复优先，保住基础题',{academic:{math:-3},mind:15,stress:-18,bond:10},'你们删掉一部分任务，先把三顿饭和睡眠认真安排好。',['sprint_recovery']),
O('孩子主导复习，家长负责后勤',{energy:-9,selfD:12,bond:8,academic:{chinese:7,math:9,english:7},selectedGain:8},'孩子把计划贴在自己的房间里，留给你的只有买水果的清单。',['sprint_autonomy'])]),
D('mock_exam','最后一次模拟考有起伏，家长群已经开始猜分。','学业 / 心理 / 亲子',[
O('只分析可改的失误',{energy:-9,academic:{chinese:8,math:10,english:8},selectedGain:8,selfD:5},'红笔只圈了几处，剩下的地方留给孩子自己写。'),
O('请老师做最后诊断',{money:-12,academic:{math:12,english:10},selectedGain:10,stress:4},'老师把“再做一套”改成“把这一套看懂”，你也记住了。',['tutoring']),
O('关掉排名消息，守住状态',{energy:-5,mind:12,stress:-12,bond:7,academic:{chinese:3}},'餐桌上终于没有别人的分数，孩子多说了一会儿学校的事。'),
O('拿更高名次持续激励',{academic:{math:13,english:12},mind:-10,bond:-9,stress:13},'孩子背得出你的目标，却很久没提过自己的想法。',['pressure'])]),
D('application','志愿方向谈到城市、专业，也谈到离家多远。','自律 / 亲子 / 经济',[
O('孩子先列愿望，一起核实限制',{energy:-10,selfD:8,bond:10},'你在地图上查车程，孩子在旁边补上了想学的课程。',['child_choice']),
O('优先稳定与预算，协商折中',{money:7,marriage:5,bond:-3,selfD:4},'有几个选项被划掉了，你们也把划掉的理由说清楚。'),
O('主要由家长决定，减少风险',{energy:-7,selfD:4,bond:-12,rebellion:12,stress:5},'表格填得很整齐，孩子的签名却拖到了最后。',['parent_choice']),
O('请老师帮忙，保留多层选择',{money:-8,selfD:7,mind:6},'没有哪一栏保证未来，你们至少知道每条路从哪里开始。')]),
D('exam_eve','考前一晚，孩子把准考证看了一遍又一遍。','心理 / 压力 / 亲子',[
O('检查考具，说“明天我在门口等你”',{energy:-6,mind:12,bond:9,stress:-12},'孩子把袋子放好，终于问你考完那天能不能去吃面。'),
O('再过一遍易错点，到点就停',{energy:-8,academic:{chinese:5,math:7,english:5},selectedGain:6,stress:3},'最后一页合上时，你们一起把闹钟调好了。'),
O('提醒投入与期待，要求全力以赴',{academic:{math:7,english:6},mind:-10,stress:14,bond:-7},'孩子点头很快，灯灭了以后仍听得见翻身的声音。',['pressure']),
O('不再谈考试，吃顿平常晚饭',{energy:-5,mind:10,stress:-10,marriage:6,academic:{math:-1}},'碗筷还是平时那一套，孩子说今天的汤很好喝。')])],events:[]}
];
// 职教线：三个完整阶段，各四个决策；不以“选了职教就结束”代替成长过程。
const vocational=[
{title:'15~16 岁 · 职校·重新出发',intro:'新的学校里，实训室与文化课教室挨在一起。孩子回家时讲到第一次亲手接好的线路，也会小声问起原来同学的高中生活。你们正在适应一条和预想不同的路：先看清课程和升学资格，再试着把每一天过得具体。一次考试划开了路径，却没有替这个孩子决定所有可能。',decisions:[
D('v1_specialty','选专业时，宣传册上每个方向都写着前景很好。','技能 / 自律 / 经济',[
O('实地看实训室，选择信息技术',{energy:-10,coding:15,selfD:7},'孩子摸到了真正的设备，也看到了机房里需要解决的旧问题。',['v_it']),
O('选择体育服务方向',{money:-8,sports:15,fitness:6},'第一堂课先学安全，孩子回家演示得格外认真。',['v_sport']),
O('选择音乐与文化服务方向',{money:-10,music:15,selfD:5},'老师没有许诺舞台，先让每个人练习可靠地完成一次排练。',['v_music']),
O('暂不追热门，比较课程和岗位',{energy:-12,selfD:11,bond:5},'你们问了几位毕业生，留下的笔记比宣传册更厚。')]),
D('v1_culture','文化课基础不稳，孩子觉得“反正用不上”。','学业 / 心理 / 精力',[
O('用实际任务带动语数外',{energy:-10,academic:{chinese:10,math:10,english:10},selfD:5},'说明书里的英文第一次不只是考试上的空格。'),
O('报对口升学基础班',{money:-14,academic:{chinese:13,math:13,english:12},stress:6},'班级里有人比孩子大几岁，大家都从基础题开始。',['tutoring']),
O('先稳住出勤，再逐步加量',{energy:-7,mind:10,selfD:7,academic:{math:3}},'那一周每天都准时到了教室，孩子主动把签到表给你看。'),
O('主攻技能，文化课只保基础',{coding:12,music:6,sports:6,academic:{english:-6,math:-5}},'实训进度快了一些，你们也把未来升学要补的部分记下来。')]),
D('v1_compare','亲戚聚会时，有人问“是不是没考上高中”。','亲子 / 家庭关系 / 心理',[
O('及时接住话题，回家再听孩子说',{energy:-8,bond:12,mind:10},'回家路上，孩子第一次讲了在新学校交到的朋友。'),
O('让孩子介绍自己的作品',{energy:-6,selfD:9,bond:7,rebellion:3},'介绍磕绊了几次，最后还是把作品完整展示出来。'),
O('少参加比较，留出休息',{marriage:-5,mind:10,stress:-8},'饭局少了一次，周末终于可以睡到自然醒。'),
O('要求用成绩证明给别人看',{selfD:8,academic:{math:8},mind:-8,stress:12},'孩子把那句话写在桌角，纸边后来被反复揉皱。',['pressure'])]),
D('v1_safety','学校推荐校外体验，合同和费用说明并不清楚。','精力 / 经济 / 技能',[
O('核实资质与安全后再决定',{energy:-12,selfD:9,coding:6},'你们要求看了书面安排，也学会不急着交钱。'),
O('选择校内项目，晚一点外出',{money:-7,coding:10,music:6,sports:6},'项目不够新鲜，却能反复练到真正熟练。'),
O('家长陪同参观正规企业',{money:-9,energy:-7,bond:8,selfD:7},'岗位上的师傅说了优点，也把辛苦的地方讲得很清楚。'),
O('暂缓实践，集中补文化',{coding:-3,academic:{chinese:10,math:10,english:10},energy:-8},'孩子有些失望，你们约好下个阶段再看一次机会。')])]},
{title:'16~17 岁 · 职校·路线选择',intro:'实训服的袖口有了磨痕，孩子已经能独立完成一些任务。升学班、技能考试和实习的信息陆续发来，你们开始把愿望拆成具体的报名条件与时间表。有人想尽早挣钱，有人想再读几年。你不再只问哪条路听起来体面，而是问孩子愿意为哪一种日子继续准备。',decisions:[
D('v2_route','下一步，主要投入哪条路线？','路线 / 学业 / 技能',[
O('准备对口升学',{energy:-12,academic:{chinese:12,math:12,english:12},selfD:7},'你们把考试科目逐项写下，从最薄弱的一门开始。',['v_route_study']),
O('准备技能就业，核实岗位与合同',{energy:-10,coding:15,selfD:9,academic:{english:-3}},'工资之外，你们第一次认真计算通勤与住宿。',['v_route_job']),
O('先升高职，再规划专升本',{money:-12,academic:{chinese:10,math:10,english:12},selfD:8},'你们把更远的目标写成虚线，先给眼前的考试画了实线。',['v_route_upgrade']),
O('先体验一个项目，再确定方向',{energy:-14,mind:7,coding:10,bond:5},'孩子发现想象中的岗位与现场并不完全一样，也愿意重新讨论。',['v_route_explore'])]),
D('v2_training','一项作品总在最后一步出错，老师说要耐心。','技能 / 自律 / 心理',[
O('记录故障，分段重做',{energy:-11,coding:15,selfD:8},'日志写满一页后，那个总被忽略的小问题终于出现了。'),
O('请老师做针对性指导',{money:-10,coding:14,iq:5},'老师没有代做，只让孩子自己解释每一步。'),
O('换成擅长的服务与表达任务',{coding:-4,music:12,academic:{chinese:10},mind:6},'孩子第一次在台前完整说清楚一份工作计划。'),
O('先休息，次日再试',{coding:-3,mind:12,stress:-12,fitness:5},'第二天同一个问题没有变简单，但孩子不再一开始就想摔东西。')]),
D('v2_study','晚自习和实训冲突，必须调整一周的安排。','学业 / 技能 / 压力',[
O('固定语数外底线，再安排实训',{energy:-12,academic:{chinese:11,math:12,english:11},coding:6},'计划表没有排满，孩子反而连续做到了几周。'),
O('全力升学训练',{money:-15,academic:{chinese:15,math:15,english:15},mind:-8,stress:10},'分数在变，课间聊天少了一些。',['tutoring']),
O('主攻技能考核',{energy:-10,coding:15,sports:8,music:8,academic:{math:-4}},'作品渐渐成形，你们也约定之后补齐没有练到的部分。'),
O('先找回学习意愿',{academic:{math:-3},mind:14,bond:9,stress:-12},'你没有要求马上承诺，孩子第二天自己问起了老师的答疑时间。')]),
D('v2_talk','孩子说想自己赚钱，不愿一直花家里的钱。','亲子 / 经济 / 自律',[
O('一起做预算，不急着离校',{energy:-8,bond:10,selfD:8},'数字算完以后，你们都更清楚了坚持读书需要哪些支持。'),
O('支持合规的短期体验',{energy:-7,money:8,selfD:8,stress:4},'第一笔收入不多，孩子却认真记下了花去的时间。'),
O('家庭暂时收缩开支，保住学业',{money:-13,mind:10,bond:10},'外出聚餐少了，饭桌上的讨论却没有停。'),
O('要求别分心，只负责读书',{academic:{math:8,english:8},bond:-9,rebellion:9},'孩子没有再提钱，也没再讲过那个想尝试的岗位。',['pressure'])])]},
{title:'17~18 岁 · 职校·走向下一站',intro:'最后一年的校园里，招聘信息和升学通知挨着贴。孩子开始自己打电话问条件，也开始知道一份选择背后要付出的时间。你们仍会为考试和费用发愁，却不再把任何一张通知当成人生的全部结论。行李箱放在门边，你看着孩子整理证件，忽然发现这些年已经走过很远。',decisions:[
D('v3_sprint','离最后的考试和考核不远了，怎样安排冲刺？','学业 / 技能 / 心理',[
O('升学为主，稳步补语数外',{energy:-12,academic:{chinese:15,math:15,english:15},selfD:6},'你们把大目标拆到每周，孩子知道哪一页是真的会了。',['v_sprint_study']),
O('技能考核为主，完善作品',{energy:-12,coding:15,music:10,sports:10,selfD:6},'作品里留下了修改痕迹，孩子不再急着把它们藏起来。',['v_sprint_skill']),
O('状态优先，减少无效熬夜',{academic:{math:-3},mind:15,stress:-15,bond:8},'那一晚灯关得早，第二天孩子自己准时起床。',['sprint_recovery']),
O('升学技能两头冲',{money:-15,academic:{chinese:12,math:15,english:12},coding:12,mind:-12,stress:15},'时间表没有空白，饭桌上也很少有人再说轻松的话。',['tutoring','pressure'])]),
D('v3_qualify','报名与实习材料摆在桌上，需要逐项核实。','精力 / 自律 / 经济',[
O('一起核对资格和截止时间',{energy:-12,selfD:10,bond:5},'确认邮件收到后，孩子把文件备份了两份。',['v_qualified']),
O('请学校老师指导手续',{energy:-8,money:-5,selfD:8},'老师划掉了不需要的收费项目，你们把真正要准备的列了出来。',['v_qualified']),
O('优先选离家近的合规岗位',{money:8,mind:5,coding:-3},'机会少了一些，通勤与安全终于在可承受的范围。',['v_qualified']),
O('放缓一步，补材料再报名',{academic:{math:-3},energy:-10,mind:9,selfD:6},'没有赶上所有场次，但你们没有把模糊的承诺当成保证。',['v_qualified'])]),
D('v3_offer','真正要提交去向了，孩子想再和你谈一次。','最终去向 / 亲子 / 资源',[
O('报考对口升学，接受结果分层',{energy:-10,selfD:8,academic:{chinese:7,math:7,english:7}},'孩子亲手点下确认，把截图发给了你。',['v_final_study']),
O('选择技能就业，保留继续学习计划',{energy:-8,money:8,selfD:7,academic:{math:-3}},'合同逐条看完，你们把继续学习的时间也写进了日历。',['v_final_job']),
O('报读高职，未来再争取专升本',{money:-14,selfD:8,academic:{english:9},bond:5},'下一站有了名字，更远的目标仍需要以后一次次争取。',['v_final_upgrade']),
O('重新评估方向，先做安全过渡',{money:-7,mind:10,bond:8,stress:-6},'你们给过渡期订了复盘日期，没有把等待说成永远。',['v_final_job'])]),
D('v3_departure','离校前一天，孩子把工具和课本分进两个袋子。','心理 / 亲子 / 自律',[
O('一起整理，听孩子讲下一步',{energy:-6,bond:12,mind:10},'袋子上写着不同用途，孩子说这一本还不能扔。'),
O('再复习一次基础和安全流程',{energy:-8,selfD:10,coding:8,academic:{math:6}},'清单不长，最后一条是遇到问题先求助。'),
O('强调收入和回报，催促独立',{money:7,selfD:6,bond:-10,stress:10},'孩子把行李拉链拉上了，想说的话却留在嘴边。',['pressure']),
O('吃顿平常晚饭，留出休息',{money:-5,mind:12,marriage:7,stress:-10},'饭后孩子主动洗了碗，说明天可以自己提箱子。')])]}];
// 24 个事件，带主动应对路径；每阶段最多触发两个，抽取结果进入存档。
const events=[
E('fever',.28,'孩子突然发烧，原来的安排全被打乱了。',[
O('及时就医，轮流照顾',{money:-9,energy:-9,fitness:8,bond:5},'体温慢慢降下来，你们把接下来的两天重新安排。'),
O('按医嘱居家观察，暂停额外活动',{energy:-12,fitness:5,mind:5},'测温记录写得很密，孩子睡着后你才喝上一口温水。'),
O('请家人支援，自己处理工作交接',{money:-4,marriage:6,energy:-5},'有人送来一锅热粥，你终于把未读消息处理完了。')]),
E('inlaws',.36,'长辈觉得你的带法太费事，饭桌上的声音渐渐大了。',[
O('单独谈，明确彼此能承担什么',{energy:-10,marriage:8,bond:3},'没有人完全服气，但下一周的分工终于写了下来。'),
O('减少依赖，自己多承担一点',{energy:-15,bond:7,marriage:3},'争执少了，你也得把自己的休息重新安排。'),
O('暂时沿用长辈的办法',{energy:8,marriage:-5,selfD:-3},'饭桌安静了，问题却还需要找个时机再谈。')]),
E('layoff',.20,'单位调整岗位，家里的收入短期少了一截。',[
O('缩减非必要开支，重新做预算',{energy:-9,money:7,mind:-3},'账本被翻到新的一页，孩子也问起能帮忙做什么。'),
O('争取新工作，请家人分担',{energy:-14,money:12,marriage:-4},'简历发出很多封，你们把接送排班改了又改。'),
O('留一段缓冲期，照顾家人',{money:-12,energy:10,bond:8},'收入还没恢复，饭桌上却多了几次完整的谈话。')]),
E('bully',.28,'孩子回家衣服脏了，说有人总拿自己开玩笑。',[
O('听完经过，保存信息并找老师',{energy:-12,bond:11,mind:8},'孩子说到一半停了很久，你等到最后也没有催。'),
O('联系学校共同建立保护计划',{money:-5,energy:-8,selfD:5,mind:8},'接送地点变了，孩子知道遇到事可以先找谁。'),
O('先调整班内活动，陪孩子练习求助',{energy:-10,mind:6,bond:7},'那句“请停下”练了几遍，老师也答应留意。')]),
E('teacher_call',.31,'老师打来电话，说孩子在课堂上和同学起了争执。',[
O('先核实双方经过，再谈责任',{energy:-9,selfD:7,bond:5},'孩子确实有做错的地方，也终于把被打断的话说完。'),
O('直接要求道歉并加练习',{selfD:8,mind:-5,bond:-6,stress:6},'道歉发出去了，孩子却不愿再讲细节。',['pressure']),
O('请老师安排一次面对面沟通',{energy:-12,mind:5,selfD:6},'谈话结束时，没有人马上成了朋友，但彼此知道了界限。')]),
E('neighbor',.25,'邻居家的喜报发进群里，你忍不住多看了几遍。',[
O('祝贺之后，回到自家的节奏',{energy:-4,mind:6,bond:4},'你关掉群聊，孩子正在讲今天食堂的新菜。'),
O('参考学习方法，不比较孩子',{energy:-8,academic:{math:6,english:6},selfD:3},'你留下的是整理方法，没有把别人的名次贴到墙上。'),
O('提高目标，希望孩子也能争气',{academic:{math:8},stress:9,bond:-7},'孩子记住了那个名字，却不再愿意讲自己的小进步。',['pressure'])]),
E('secret_games',.30,'夜里经过房间，你发现孩子偷偷在玩游戏。',[
O('先补睡眠，再商量使用规则',{energy:-9,selfD:8,bond:7},'协议也写上了大人要遵守的时间，孩子多看了那一行。'),
O('没收设备，增加监督',{selfD:9,coding:-4,bond:-9,rebellion:10},'屏幕不亮了，房门却关得比以前更紧。',['pressure']),
O('一起了解游戏，把娱乐放进计划',{energy:-11,coding:5,mind:6,selfD:4},'你终于知道一局需要多久，孩子也知道了为什么不能拖到半夜。')]),
E('borrow',.20,'亲戚急着借钱，数额超过了你预留的人情预算。',[
O('只借能承担的部分，写清约定',{money:-9,marriage:5,selfD:3},'你把底线说清楚，也没有要求孩子为这件事让出所有安排。'),
O('婉拒借款，帮忙找其他办法',{energy:-10,money:4,marriage:-3},'电话讲了很久，你关上免提后缓了一会儿。'),
O('多帮一把，暂缓付费项目',{money:-15,bond:5,mind:4},'你解释了这段时间的变化，孩子问那能不能去图书馆。')]),
E('cat',.25,'孩子在回家路上遇见一只瘦小的流浪猫。',[
O('联系救助，陪孩子做力所能及的事',{money:-5,energy:-7,bond:8,mind:5},'猫有了暂时的去处，孩子认真保存了联系人的号码。'),
O('核实家庭条件后领养',{money:-10,energy:-9,selfD:8,mind:8},'喂食表贴在墙上，你们把责任也一起领回了家。',['cat']),
O('不带回家，帮助寻找领养者',{energy:-9,selfD:5,bond:5},'孩子有点舍不得，还是一起写好了说明。')]),
E('parent_health',.22,'你自己的体检也出现了需要复查的项目。',[
O('按时复查，调整家务分工',{money:-10,marriage:9,energy:5},'孩子第一次认真提醒你别总把自己的预约往后推。',['teamwork']),
O('请假休息，暂停额外课程接送',{money:-8,energy:12,mind:5},'你们发现有些安排停一次，生活也还能继续。'),
O('就医同时维持工作，请亲友支援',{energy:-10,money:5,marriage:5},'日程仍然紧，但你终于在需要时打了求助电话。')]),
E('friend_move',.25,'孩子最好的朋友要搬走，最后一周一直闷闷不乐。',[
O('帮他们安排告别，保留联系',{energy:-8,bond:7,mind:8},'合照背后写了地址，孩子认真折好放进书里。'),
O('鼓励参加新活动，慢慢认识人',{money:-6,selfD:5,mind:7},'新朋友没有马上出现，你们也没催着忘记旧朋友。'),
O('先允许难过，学习量稍减',{academic:{math:-3},mind:10,stress:-7},'那个晚上没有催作业，孩子后来主动拿出了练习本。')]),
E('library',.32,'社区图书馆招募亲子志愿者，需要一个周末。',[
O('一起去，整理书架',{energy:-10,academic:{chinese:7},bond:6},'孩子把标签贴得很齐，回家时还讲着遇到的读者。'),
O('孩子参加，你负责接送',{energy:-6,selfD:8,mind:5},'第一次独立值班结束，孩子知道了一本书怎样回到架上。'),
O('这次不去，留时间完成学习',{academic:{chinese:6,math:6},mind:-3},'报名表放回原处，孩子把当天计划做完了。')]),
E('sports_injury',.20,'一次运动后脚踝疼痛，训练和作业都得调整。',[
O('及时评估，按建议恢复',{money:-10,fitness:9,sports:-3},'计时器暂时收起，恢复动作被认真记在纸上。'),
O('暂停比赛，保持安全的基础活动',{energy:-8,fitness:7,mind:5,sports:-4},'孩子没去成比赛，队友仍把合照发了过来。'),
O('请教练调整目标与训练',{money:-6,energy:-6,selfD:6,fitness:5},'这一次训练的终点，是安全地走回家。')]),
E('award',.28,'孩子的小作品被老师表扬，想买一点更好的材料。',[
O('提供预算，让孩子自己挑',{money:-10,coding:10,selfD:5},'购物清单改了三次，孩子学会把想要和需要分开。'),
O('先用现有材料，陪着改进',{energy:-10,coding:8,iq:5,bond:4},'旧纸盒被拆开又粘上，成品并没有因此少一份认真。'),
O('庆祝一下，但不再追加任务',{money:-5,mind:8,bond:6},'你只说这次做得很认真，没有马上问下次能拿什么奖。')]),
E('family_cold',1,'家里几天没好好说话，连晚饭都各吃各的。',[
O('腾一个晚上谈分工，先停止指责',{energy:-12,marriage:14,mind:5},'没有立刻和好，但第二天有人先开口问了早餐。'),
O('寻求家庭支持，重新安排责任',{money:-10,marriage:12,bond:6},'你们把难以开口的话说了一部分，也留下了下一次谈话的时间。'),
O('暂时各自冷静，承担具体家务',{energy:-9,marriage:8,selfD:3},'碗洗完后，桌上多了一张写着明天安排的纸。')]),
E('exhaustion',1,'你在等孩子下课时睡着了，醒来手机已震了几次。',[
O('删去一项额外安排，先休息',{academic:{math:-3},energy:15,marriage:5},'接送表少了一格，你终于能在晚上完整睡一觉。'),
O('请家人接手一部分',{money:-7,energy:12,marriage:6},'你第一次没有把“我还能撑”说出口。'),
O('调整通勤与课程顺序',{energy:10,money:-5,selfD:4},'路线短了一点，等待的时间终于能坐下来吃顿饭。')]),
E('school_trip',.23,'学校安排外出活动，费用不低，孩子很期待。',[
O('核实安全后支持参加',{money:-12,mind:8,selfD:5},'出发前孩子自己检查清单，你只补了水和证件。'),
O('不参加远行，安排本地替代',{energy:-10,bond:7,mind:5},'孩子仍有点失落，也认真选了周末想去的地方。'),
O('参加学校提供的低成本方案',{energy:-6,money:-4,selfD:7},'行程短了一天，回家后讲的故事却一点也不少。')]),
E('test_anxiety',.34,'考试前孩子反复问时间，试卷上会做的题也没写完。',[
O('减少模拟，练习稳定节奏',{academic:{math:-3},mind:12,stress:-14},'这一次练习没有计分，只记下了什么时候开始慌。'),
O('寻求专业帮助，同时和老师沟通',{money:-12,energy:-6,mind:14,stress:-10},'孩子第一次知道，不用把所有不舒服都解释成不努力。'),
O('做小份限时练习，逐步适应',{energy:-10,selfD:8,academic:{math:5},stress:3},'闹钟响时没有责备，你们只讨论下一次怎么分配时间。')]),
E('second_child',.20,'家里迎来了第二个孩子，原来的时间安排又要重排。',[
O('明确照顾分工，保留单独陪伴',{energy:-14,marriage:8,bond:7},'你们给大孩子留了一段不被打断的时间。',['second_child']),
O('请亲友支援，减少手足比较',{money:-12,mind:7,marriage:7},'来帮忙的人先学会了不再说“大的就该让着小的”。',['second_child']),
O('缩减外部安排，全家重新适应',{academic:{english:-3},energy:-7,bond:9,mind:6},'日程空出了一些，孩子也终于问出了心里的担忧。',['second_child'])]),
E('music_stage',.28,'学校演出缺一个节目，孩子想试着站上台。',[
O('支持排练，自己承担接送',{energy:-10,music:12,mind:5},'舞台灯亮起来时，孩子在人群里找到了你。'),
O('参加合奏，分担压力',{money:-7,music:10,bond:5},'出错时有人接住了下一拍，孩子第一次感到并不孤单。'),
O('这次不报名，留给文化课',{music:-4,academic:{chinese:7,english:7}},'孩子把节目单夹在书里，你答应之后再认真讨论。')]),
E('sports_meet',.28,'运动会报名表发下来，老师想让孩子参加训练。',[
O('支持训练并保证恢复',{energy:-10,sports:12,fitness:6},'结束后没拿第一，孩子仍讲了很久交棒的那一下。'),
O('参加较轻的集体项目',{energy:-6,sports:8,mind:7},'合照里每个人都笑得乱七八糟，名次反而没人记得。'),
O('暂缓训练，补齐薄弱科目',{sports:-4,academic:{math:8,english:6}},'跑鞋还在门边，你们把这次放下的理由说清楚了。')]),
E('coding_camp',.26,'正规编程活动开放报名，训练需要额外时间。',[
O('核实规则后参加',{money:-12,coding:13,iq:6},'孩子带回来的不是奖牌，而是一页终于弄懂的错误。'),
O('线上用已有题目自行练习',{energy:-12,coding:10,selfD:6},'你学不会那些代码，却能帮忙把安静的时间留出来。'),
O('暂缓活动，照顾整体学业',{coding:-3,academic:{math:8,english:7}},'报名页面关掉了，孩子把以后想试的日期记了下来。')]),
E('sleep',.27,'连续几天晚睡，早晨怎么叫都很难起床。',[
O('砍掉重复任务，恢复作息',{academic:{math:-3},fitness:10,mind:10,stress:-10},'第一天仍睡不着，你们没有因此把新的安排放弃。'),
O('调整晚间安排，全家一起早收尾',{energy:-10,fitness:9,marriage:5},'客厅的电视先关了，孩子房间的灯也慢慢早了。'),
O('找老师商量减少无效作业',{energy:-12,mind:9,selfD:5},'沟通并不顺利，但至少弄清了哪些任务必须完成。')]),
E('own_plan',.28,'孩子拿出一份自己写的计划，问你能不能试一个月。',[
O('支持试行，约好复盘而非检查',{energy:-8,selfD:12,bond:9},'你们把复盘日期圈上，剩下的格子留给孩子自己填。'),
O('一起修改目标，保留弹性',{energy:-10,selfD:10,mind:6},'计划少了几条，实际做到的反而多了。'),
O('坚持原安排，等考试后再说',{academic:{math:8},bond:-7,rebellion:7},'那张纸被收进抽屉，孩子没有再问第二遍。',['pressure'])])
];
// 每阶段两个常规候选，另有条件触发的冷战/疲惫；统一在引擎中上限为二。
const ids=[['inlaws','parent_health'],['fever','layoff'],['cat','friend_move'],['library','school_trip'],['teacher_call','secret_games'],['sports_injury','neighbor'],['bully','award'],['test_anxiety','coding_camp'],['sleep','borrow'],['own_plan','music_stage'],['sports_meet','test_anxiety'],['sleep','own_plan']];
stages.forEach((s,i)=>s.events=ids[i].map(id=>events.find(e=>e.id===id)));
const endings=[
['dropout','先停下来，也是一条路',1,'D','mind < 20','准考证仍放在抽屉里，这一年却没有按原定计划走进考场。最初几天，你总忍不住计算“落下了多少”，后来才慢慢把注意力放回一顿吃得下的饭、一次愿意出门的散步。休学与恢复需要时间，也需要可靠的专业支持。学校和家人一起讨论下一步，考试可以重新安排，孩子不必在最难受的时候证明什么。故事停在一个还没有确定日期的早晨，你们先把窗帘拉开。','先和孩子一起把今天过稳，再讨论下一张时间表。'],
['estrangement','没有收到的回信',2,'D','bond < 20 && rebellion > 75','录取消息也许很好，也许普通，但孩子在成年后很快搬出了家。电话常常没有接通，节日里的问候只剩几个字。你翻看旧照片，才发现许多被当成懂事的沉默，其实从很早就开始了。这份距离不会因为一次道歉立刻消失，重建联系也需要孩子愿意。你开始写一些不附带要求的消息，不再追问为什么不回复。这个结局没有给出团圆的保证，只留下一个尊重边界、重新学习倾听的可能。','联系不是账单，付出也不能替对方决定亲近。'],
['vocational_track','从手里的本领出发',3,'B','track === vocational','毕业那天，孩子把实训用过的工具擦干净，和课本一起装进箱子。这条路不是你们最早画在纸上的那条，却也有真实的考试、作品、同伴和需要承担的责任。接下来可能继续升学，也可能进入一个普通岗位，工作后的学习仍不会自动变得容易。你们认真核实每一个资格、合同和机会，给远一点的目标留出时间。孩子带走的不只是一次分流的结果，还有这些年终于学会的安排自己生活的能力。','把眼前一步走实，远处的目标可以继续争取。'],
['art_route','把练习弹成生活',4,'A','music >= 80 && art route && culture qualified','专业考核的通知和文化课成绩放在同一张桌上。孩子没有因为喜欢音乐就省去练习的枯燥，也没有因为走了这条路就避开升学的压力。录取到来的时候，你想起许多接送的夜晚，和那首总在同一个地方停下的曲子。新的校园里，孩子仍要面对作业、排练和未来工作的不确定。不同的是，长期坚持终于变成了一项可以继续学习的专业，而不是简历里孤零零的一行字。','热爱需要支持，也需要容得下进步缓慢的日子。'],
['sports_route','终点线之后',5,'A','sports >= 80 && sports route && fitness and culture qualified','专项测试结束时，孩子没有立刻看计时器，而是先慢慢走完放松的那一段。许多天的汗水、恢复和文化课复习，终于换来继续系统学习的机会。录取通知并不意味着从此只需奔跑，新的学校还有理论课、队伍协作和职业方向的选择。你把旧训练日志留在家里，第一页的字迹还很稚嫩。那些没有奖牌的训练日，也和最好的一次成绩一样，组成了这条路。','看见成绩，也记得照顾承载成绩的身体。'],
['competition','难题之外，还有世界',6,'S','coding >= 75 && iq >= 80 && passed competition review','竞赛成绩没有直接变成一张无条件的门票。孩子先通过阶段审核，再完成文化课与综合考核，最终获得模拟拔尖培养项目的录取机会。消息确认时，你们没有马上打开新的训练计划，而是把很久没整理的作品一一归档。大学里的题会更难，也更开放，不再每一次都有唯一答案。孩子带着那些调试到深夜的经验出发，也需要重新学会向别人请教，在合作里找到自己的位置。','支持一个兴趣，也给它之外的生活留下位置。'],
['top_university','走进更远的校园',7,'S','score >= top line','录取页面刷新出来的时候，屋里安静了几秒。孩子反复看学校和专业的名字，你却先想起第一次送进幼儿园时攥着袖口的手。行李箱装满后，新的城市仍有很多你们不了解的事：选课、室友、失败和第一次真正独自做决定。高分带来了更多选择，并没有替任何人安排好今后的人生。你们把车票和证件放好，约定到校后发一条消息，然后把送到门口的那一程慢慢走完。','这张通知是新的起点，孩子不必永远证明自己配得上它。'],
['good_university','努力有了回声',8,'A','score >= elite line','通知书比想象中轻，拿在手里却让人想起许多具体的日子。有人接送，有人做饭，孩子也在越来越多的清晨自己起床。最后的学校不是每次模拟里预测的那个，却给了继续探索的空间。你们开始查课程和宿舍，而不是只查排名。新的生活里仍会有比较，也会有改变方向的念头，但至少这一次，孩子愿意坐下来一起说说期待。录取只是这一页的结尾，下一页还留着空白。','记得庆祝，也允许未来的选择与今天不同。'],
['first_tier','自己的那一条路',9,'B','score >= special line','志愿表最后落在一所普通而扎实的学校。孩子查了课程，问了学长学姐，也认真比较了几种可能。你们没有得到所有想要的结果，却终于把“别人说不错”换成了“我们了解过”。开学前的日子照常有做饭、收衣服和整理行李，担心也没有突然消失。只是当孩子谈起未来时，句子里多了几个自己的打算。这些打算还很小，却足够让新的学期不只是被推着开始。','学校的名字之外，还有每天怎样学习与生活。'],
['second_tier','在普通的地方扎根',10,'C','score >= undergraduate line','分数让一些志愿变成了灰色，也留下另一些可以认真了解的选择。你们看清学费和专业安排，最终定下一个能够承担、也愿意尝试的去处。亲戚的评价并不完全一致，孩子却第一次自己打电话问清了报到事项。未来不会因为这所学校自动顺利，也不因它普通就失去可能。你们把预算重新算过，把学习计划写得短一些，在一个并不耀眼却真实的起点上，慢慢开始下一段生活。','普通不是需要替孩子辩解的一件事。'],
['junior_college','还可以继续往前',11,'C','score < undergraduate line','这次分数没有到达本科参考线，填志愿的那几天比想象中沉重。后来你们把可选学校、复读条件与职业方向逐项摆开，决定先走向一条能继续学习的路。那不是一句“没关系”就能抹去的失落，也不是一次结果就能写完的人生。孩子需要时间消化，家里也要重新计算投入。你们最终约好，不用漂亮的话掩盖困难，也不拿一次考试替一个人盖章，先把下一次报名和今天的饭认真安排好。','承认失落，也把下一步留在可以商量的地方。']
].map(x=>({id:x[0],title:x[1],priority:x[2],rating:x[3],condition:x[4],text:x[5],advice:x[6]}));
const modifiers=[
{id:'ordinary_but_happy',title:'普通而完整的人生',condition:'score >= 480 && bond > 70 && mind > 70 && stress < 50',text:'孩子愿意告诉你烦心事，也愿意谈起接下来的计划。考试之外，家里还保留着一起吃饭、争论之后再说话的能力。这份完整不需要用更高的分数来兑换。'},
{id:'money_ruin',title:'账本里，仍有未还的那一页',condition:'money < 10 && score < special line',text:'这些年的投入挤尽了家庭的余裕，结果却没有按预算里的期待发生。经济余裕并不等于真实债务，但现在确实需要暂停新的高消费承诺，和家人一起安排可承担的下一步。'}];
const achievements=[
['house','学区房房奴','购买学区房并完成一局。'],['no_tutor','零补习班通关','一局中从未报名学科补习。'],['first','把节奏找回来','中考进入重点线且高考达到名校参考线。'],['steady','六年，慢慢坚持','初一到高三每阶段结束自律都达到 65。'],['pressure_fail','鸡娃失败','多次高压选择，最终未到特控参考线或暂停考试。'],['free_miracle','放养出奇迹','至少六次自主或放养选择，高考仍达名校参考线。'],['team','夫妻同心','至少三次共同分工，结局家庭关系达到 85。'],['solo','一个人的家长会','承担了独自照护，也独自参加过家长会。'],['670','六百七十分','普通高考总分至少 670。'],['away','再也没回过家','触发亲子疏离主结局。'],['athlete','体育特长生','完成体育路线录取。'],['piano','琴键上的刻度','音乐达到 90，完成一局。'],['coder','编程神童','通过竞赛审核并完成竞赛路线录取。'],['two','二胎家庭','本局迎来第二个孩子并完成一局。']
].map(x=>({id:x[0],title:x[1],desc:x[2],condition:x[2]}));
window.GAME_DATA={
meta:{title:'MyChild',version:'1.0.0',subtitle:'把十八年，慢慢写成一封家书。',lines:{本科:430,特控:520,名校:620,顶尖:660},historyOffset:10,zhongkao:{max:750,key:590,normal:440},note:'综合模拟参数 · 不对应任何省份或年份的真实录取规则',license:'GPL-3.0-only'},
initialState:{money:60,energy:75,marriage:70,iq:50,fitness:55,mind:70,selfD:45,bond:70,stress:20,rebellion:10,music:10,sports:10,coding:5,academic:{chinese:50,math:50,english:50,physics:50,history:50,chemistry:50,biology:50,politics:50,geography:50},picked:{primary:null,secondary:[]},track:'key',flags:{},log:[],seed:0,stageIndex:0},
stages,vocational,events,endings,modifiers,achievements,
labels:{money:'经济余裕',energy:'精力',marriage:'家庭关系',iq:'智力',fitness:'体质',mind:'心理健康',selfD:'自律',bond:'亲子关系',stress:'压力',rebellion:'自主与冲突',music:'音乐',sports:'体育',coding:'编程',chinese:'语文',math:'数学',english:'外语',physics:'物理',history:'历史',chemistry:'化学',biology:'生物学',politics:'思想政治',geography:'地理',key:'重点高中',normal:'普通高中',vocational:'职业教育'},
ui:{skill:'技能综合',academicNote:'能力越高，继续提升的增量越小；不再学习的科目会缓慢衰减。',home:'首页',theme:'主题',auto:'跟随系统',light:'浅色',dark:'深色',save:'存档',load:'读取',continue:'继续游戏',newGame:'开始一段十八年',restart:'重新开始',back:'返回',close:'关闭',confirm:'确认选择',next:'继续',beginStage:'翻开这一页',endStage:'封存这一页',nextStage:'走向下一年',finish:'查看结局与人生回顾',all:'全部',replay:'用相同种子重新开始',export:'导出 JSON 存档',import:'导入 JSON 存档',reviewExport:'导出人生回顾',gallery:'结局与成就图鉴',slots:'存档管理',manual:'手动存档',empty:'空存档',slot:'手动档',autoSave:'自动存档',parent:'家长称呼',child:'孩子称呼',seed:'故事种子',seedHint:'留空随机生成；相同种子与选择得到相同结果。',defaultParent:'你',defaultChild:'孩子',start:'开始',homeLead:'从第一次等待，到第一次放手。',homeBody:'你将扮演一个普通家庭的家长，陪孩子从备孕走到十八岁。每一次选择都有代价，成绩也不是这段关系唯一的刻度。',homeFeatures:['十二个成长阶段','普通高中与完整职教分支','可复现的事件与多种人生结局'],homeNote:'一局约 30–50 分钟 · 离线游玩 · 自动保存',unlocked:'已解锁',achievement:'成就',ending:'结局',status:'家庭档案',resources:'家长资源',childStats:'孩子的成长',hidden:'那些没说出口的事',interests:'兴趣与特长',academic:'学业记录',stage:'阶段',decision:'决策',event:'生活的插页',progress:'本阶段进度',require:'需要经济余裕 ≥ ',cost:'将发生的变化',feedback:'你们的回声',record:'这一年的记录',saved:'已自动保存',noStorage:'本环境不支持存档，可使用 JSON 导出保存进度。',badSave:'存档格式不正确或与此版本不兼容，当前进度未被更改。',saveOk:'进度已保存。',loadOk:'存档已读取。',importOk:'存档已导入，事件与考试随机状态已恢复。',downloadOk:'文件已生成。',overwrite:'当前进度将被覆盖。已保存的成就与结局图鉴会保留。',needPick:'请先选择一个可用选项。',needSubjects:'请选择一门首选科目与两门再选科目。',subjectLocked:'选科确认后锁定；高二仅可申请更换一门。',primary:'首选科目',secondary:'再选科目 · 选择两门',currentCombo:'当前组合',transferHint:'只允许更换一门，新转入科目能力 -25，精力 -20，心理 -10。',newSubject:'转入科目',oldSubject:'转出科目',noTransfer:'保留现有组合',tooMany:'再选科目最多两门，请先取消一门。',result:'十八年，一页回声',exam:'高考成绩单',vocExam:'职教阶段综合考核',zhongkao:'中考 · 第一个分水岭',raw:'原始分',assigned:'等级赋分',total:'总分',ability:'能力',grade:'等级',lineTitle:'本局模拟参考线',radar:'六科能力雷达图',growth:'成长的轨迹',hiddenReveal:'此刻揭开隐藏刻度：复盘中的压力、亲子与冲突值显示具体数值。',resourceChart:'资源起止对比',initial:'初始',final:'结束',timeline:'人生回顾',watershed:'分水岭',newAchievements:'这一局的新成就',noNew:'这次没有新成就，故事仍被完整记下。',collectionNote:'图鉴记录跨局保留，锁定条目不揭示具体判定数值。',locked:'尚未解锁',paused:'本局暂停考试',breakdown:'各科明细',noExam:'这次没有计算考试分数。你们需要先把健康放回生活的中心。',retake:'继续学习与恢复可以重新安排。',vocNote:'职教考核采用单独的语数外与技能综合模拟，不伪装成普通高考。',pressurePenalty:'孩子在考场上握笔的手在抖。过高的压力使这次总分额外折减。',examCalm:'考试结束，孩子走出校门。分数是一份结果，十八年的生活却远不止这些数字。',passArt:'艺术专业模拟考核通过，文化成绩达到本局资格线。',passSports:'体育专项模拟考核通过，体质与文化成绩满足本局条件。',competitionPass:'竞赛阶段审核通过；最终仍需文化成绩与综合考核达标。',competitionOut:'竞赛阶段未通过资格审核，转回普通高考准备；此前的学习没有消失。',routeUnavailable:'这条路线当前可以尝试，但能否录取仍需后续条件与考核。',vStudy:'对口升学',vJob:'技能就业',vUpgrade:'高职起步 · 专升本规划',vStudyYes:'对口考试达到本局升学参考标准，获得继续就读的机会。后续报考仍需符合真实资格。',vStudyNo:'这次对口考试没有达到模拟录取标准，先进入高职层次或补基础后再争取。',vJobYes:'技能与自律达到模拟岗位要求，孩子准备在合规岗位开始工作，并保留继续学习计划。',vJobNo:'技能尚需巩固，孩子先选择有指导的学习与过渡岗位，正式就业仍需继续准备。',vUpgradeText:'下一站从高职学习开始；专升本只是后续规划，尚未发生，也不保证录取。',startIncome:'这一阶段收入补充与精力恢复',schoolGrowth:'学校学习与习惯积累',stageClose:'这一页先写到这里。',lowEnergy:'你最近容易疲惫，恢复与求助也可以成为选择。',coldHome:'饭桌上的话越来越少，家里需要一次不赶时间的谈话。',hiddenHints:{bondLow:'孩子最近很少主动讲学校的事。',stressHigh:'你问今天怎么样，孩子先看了一眼桌上的试卷。',mindLow:'孩子常常说累，连原来喜欢的事也不太提了。',rebHigh:'门关得更快了，争执结束后仍有很长的沉默。',good:'孩子愿意在晚饭后多坐一会儿，讲一些不必立刻解决的小事。'},bands:{bond:['冰点','疏远','正常','亲密'],stress:['轻松','正常','紧张','窒息'],rebellion:['乖巧','有主见','顶撞','对抗']},footer:'MyChild · 文字成长模拟 · GPL-3.0',keyboard:'数字键 1–4 选择 · Enter 确认或继续',summary:'学业水平',choice:'你的选择',outcome:'后来',noLog:'这一页还没有留下选择。',homeConfirm:'回到首页会保留当前自动存档。',confirmRestart:'开始新故事会覆盖自动存档；需要时请先存入手动档或导出。',nameNote:'称呼仅用于档案信息，不限制孩子的性别与人生方向。',seedLabel:'本局种子',snapshot:'阶段末快照',endingsCount:'已见结局',restore:'恢复此档',saveTo:'保存至此档',delete:'删除',fileTooLarge:'存档文件过大，请使用本游戏导出的 JSON 文件。',subjectCancel:'更换选择',reportTitle:'MyChild · 十八年人生回顾',unknown:'未确定',gradeNote:'再选科按模拟位次划分 A/B/C/D/E，并在等级内线性赋分。',historyNote:'历史类参考线比物理类高 10 分。',stageAcademic:'本阶段学校学习已结算。',routeLabel:'升学路线',general:'普通高考',art:'艺术路线',sports:'体育路线',competition:'竞赛路线',downloadError:'本环境无法生成下载，请换用支持文件下载的浏览器。',importLabel:'选择 JSON 存档',hiddenChange:'有些变化暂时没有写在明面上。',selectedGain:'所选三科',accessible:'无障碍说明',a11yText:'支持 Tab 导航与可见焦点。数字键选择选项，Enter 确认；输入框内不会触发快捷键。系统减少动态效果设置会被尊重。',resultRating:'本局叙事评级',ratingNote:'评级只描述游戏条件的达成，不评价孩子与家庭的价值。'}
};
})();
