export const chapters = [
  { num:1, label:'第一章', title:'数据之惑', desc:'真假之间的抉择' },
  { num:2, label:'第二章', title:'形式之困', desc:'当检查成为表演' },
  { num:3, label:'第三章', title:'家风之考', desc:'人情与原则的碰撞' },
  { num:4, label:'第四章', title:'廉洁之线', desc:'利益面前的底线' },
  { num:5, label:'第五章', title:'最终审视', desc:'所有选择汇聚成答卷' }
];

export const endings = {
  gold:{ class:'ending-gold', icon:'🌟', type:'清风正气', title:'廉洁标兵，堪当表率',
    story:'肖明在每一次考验面前都守住了底线。他如实上报数据，为基层减负，严把验收关，移风易俗简办婚礼，厉行节约反对铺张，拒收礼品礼金，坚决制止公车私用，并勇敢举报了公司违规行为。年终，他被评为全系统"廉洁从业标兵"，成为同事们学习的榜样。',
    regulation:'新时代廉洁文化建设要求：弘扬崇廉拒腐、尚俭戒奢、艰苦奋斗的优良作风，以优良党风引领企业风气。' },
  good:{ class:'ending-good', icon:'🟢', type:'守住底线', title:'虽有动摇，悬崖勒马',
    story:'肖明的从业之路并非一帆风顺，他曾在压力面前犹豫过、妥协过，但在关键时刻选择了回头。组织对他进行了提醒谈话，他深刻反省并写下了整改承诺。这些经历让他更加坚定——廉洁不是选择题，而是必答题。',
    regulation:'各级党组织应当加强对党员干部的日常教育管理监督，抓早抓小、防微杜渐。' },
  warn:{ class:'ending-warn', icon:'🟡', type:'诫勉谈话', title:'组织挽救，警钟长鸣',
    story:'肖明因多次违反工作纪律和廉洁纪律，被纪检监察部门约谈。组织对他作出诫勉处理，取消年度评优资格。坐在空荡荡的办公室里，他终于明白，有些底线一旦突破，就再也回不去了。',
    regulation:'对违纪情节较轻的党员干部，应当给予警告、严重警告处分，体现"惩前毖后、治病救人"的方针。' },
  bad:{ class:'ending-bad', icon:'🔴', type:'纪律处分', title:'贪欲膨胀，自食其果',
    story:'肖明的违纪违规行为在专项检查中被一一查实。数据造假、公款吃喝、收受礼品、公车私用……每一条都触目惊心。最终被给予撤销党内职务、行政降级处分。站在曾经的办公室门口，他百感交集——一切都是自己的选择。',
    regulation:'党员严重违纪涉嫌违法的，应当给予撤销党内职务或留党察看处分，并依法依规追究相应责任。' },
  worst:{ class:'ending-worst', icon:'⚫', type:'开除党籍', title:'身败名裂，追悔莫及',
    story:'肖明因涉嫌受贿罪、滥用职权罪被移送司法机关。在看守所冰冷的灯光下，他终于痛哭出声。妻子带着孩子来探视，隔着玻璃，他颤抖着说："对不起……"他用亲身经历证明了一个真理——莫伸手，伸手必被捉。',
    regulation:'党员严重违纪涉嫌犯罪的，应当给予开除党籍处分，并移送司法机关依法处理。' }
};

const S = {};

// ========== 第一章：数据之惑 ==========
S.ch1_s1 = { chapter:1, bg:'bg_office_xiao.jpg', dialogues:[
  { text:'2024年10月，某国有保险公司省级分公司。', type:'narration' },
  { speaker:'肖明', text:'（站在崭新的办公桌前，桌上的铭牌写着"综合管理部副总经理"）三年的努力，终于走到了这一步。', type:'thought' },
  { text:'肖明刚坐下，桌上的电话就响了。', type:'narration' },
  { speaker:'王总', text:'肖明啊，来我办公室一趟，季度经营数据的事，咱们碰一下。', type:'dialogue' }
], next:'ch1_s2' };

S.ch1_s2 = { chapter:1, bg:'bg_meeting_wang.jpg', dialogues:[
  { text:'王总办公室。烟灰缸里堆满了烟头。', type:'narration' },
  { speaker:'王总', text:'（把一份报表推过来）你看看这个数字，三季度的综合成本率比预算高了6个百分点，保费增速也没达标。总公司下周要开经营分析会……', type:'dialogue' },
  { speaker:'肖明', text:'（翻看报表，眉头紧锁）王总，这个数据确实不太好看……', type:'thought' },
  { speaker:'王总', text:'（压低声音）你是搞综合管理的，数据怎么报，你应该懂。不是让你造假，就是"技术性调整"一下。把一些理赔案件推迟到下个季度入账，承保数据再归拢归拢……其他分公司都这么干的。', type:'dialogue' },
  { speaker:'肖明', text:'（心跳加速，这不就是保险行业"五虚"里的虚假承保和虚列费用吗……）', type:'thought' }
], choices:[
  { text:'坚持原则："王总，数据必须如实上报，弄虚作假被查出来后果更严重。"', next:'ch1_honest', score:0 },
  { text:'略作妥协："那我把个别科目的口径调整一下，大方向不变。"', next:'ch1_adjust', score:-5 },
  { text:'全盘配合："明白了王总，我重新做一版。"', next:'ch1_fake', score:-12 }
], regulation:{ title:'工作纪律', article:'整治弄虚作假', content:'着力纠治抓工作敷衍应付、报数据弄虚作假等问题。保险行业严禁虚假承保、虚假理赔、虚列费用、虚挂中介、虚构保费等"五虚"行为。' }};

S.ch1_honest = { chapter:1, bg:'bg_meeting_wang.jpg', dialogues:[
  { speaker:'王总', text:'（脸色阴沉）肖明，你刚上任就不给面子？', type:'dialogue' },
  { speaker:'肖明', text:'王总，我理解您的压力。但如果被总公司稽核查出数据造假，不是扣几分的问题，是要追责问责的。不如我们把真实情况摆出来，附上整改方案，反而显得我们有担当。', type:'dialogue' },
  { speaker:'王总', text:'（沉默了一会儿）……你说的也有道理。那就按你说的办吧。', type:'dialogue' }
], next:'ch1_s3' };

S.ch1_adjust = { chapter:1, bg:'bg_office_data.jpg', dialogues:[
  { text:'肖明在办公室里反复调整着报表的数据口径。', type:'narration' },
  { speaker:'肖明', text:'（盯着屏幕上的数字，把几笔理赔案件的入账时间往后挪了挪）只是调整了入账口径……应该不算造假吧？', type:'thought' },
  { text:'他心里清楚，这条线一旦踩上去，以后只会越来越难回头。', type:'narration' }
], next:'ch1_s3' };

S.ch1_fake = { chapter:1, bg:'bg_office_data.jpg', dialogues:[
  { text:'肖明花了整整一个晚上，按王总的意思重新"制作"了一版经营数据。', type:'narration' },
  { speaker:'肖明', text:'（关掉电脑，揉了揉酸痛的眼睛）虚假承保金额调增了两千万，三笔大额理赔推迟入账……', type:'thought' },
  { text:'第二天，王总看到新报表后露出了满意的微笑。但肖明知道，这颗定时炸弹迟早会爆。', type:'narration' }
], next:'ch1_s3' };

S.ch1_s3 = { chapter:1, bg:'bg_office_zhao.jpg', dialogues:[
  { text:'下午，肖明收到总公司发来的通知——要求各分公司在一周内报送12份专项材料，涵盖党建、合规、风控、客服等多个领域。', type:'narration' },
  { speaker:'赵磊', text:'（推门进来，苦笑）老肖，看到那个通知没？12份材料，一周交。我们部门刚忙完上个月的检查报告，又来了。', type:'dialogue' },
  { speaker:'肖明', text:'（翻看通知，发现其中有好几份材料内容重叠）这些材料里，有一半的数据口径都是重复的……', type:'thought' },
  { speaker:'赵磊', text:'要不就直接转发给各基层网点，让他们各报各的？反正以前都是这么干的。', type:'dialogue' }
], choices:[
  { text:'整合精简："我来梳理一下，把重复的合并，基层只需要报一次数据。"', next:'ch1_simplify', score:0 },
  { text:'照搬转发："行吧，直接转下去，再加上我们自己要的材料。"', next:'ch1_pile', score:-12 }
], regulation:{ title:'整治形式主义', article:'为基层减负', content:'严肃纠治文件会议数量多效果差、以总结和推进工作为名随意向基层派任务、多头重复要材料等问题。切实减轻基层负担，让基层干部把更多精力用到服务群众和抓落实上。' }};

S.ch1_simplify = { chapter:1, bg:'bg_grassroots_happy.jpg', dialogues:[
  { text:'肖明花了一整天时间梳理材料需求，将12份材料整合为5份，统一了数据口径。', type:'narration' },
  { speaker:'陈主任', text:'（基层网点来电）肖总，这次的材料要求清晰多了，不用重复填报了。谢谢您体谅我们基层！', type:'dialogue' },
  { speaker:'肖明', text:'应该的，陈主任。基层同志够忙的了，我们不能再添乱。', type:'dialogue' }
], next:'ch2_s1' };

S.ch1_pile = { chapter:1, bg:'bg_grassroots.jpg', dialogues:[
  { text:'肖明把总公司的通知原封不动转发给了各基层网点，还额外增加了三项本部门的统计要求。', type:'narration' },
  { speaker:'陈主任', text:'（在电话那头叹气）又是15份材料……我们网点就6个人，白天要办业务，晚上加班写材料，大家都快撑不住了。', type:'dialogue' },
  { speaker:'肖明', text:'（挂了电话，心里有些不安）不就是多报几份材料嘛……基层本来就该配合上级工作。', type:'thought' }
], next:'ch2_s1' };

// ========== 第二章：形式之困 ==========
S.ch2_s1 = { chapter:2, bg:'bg_inspection.jpg', dialogues:[
  { text:'两周后。总公司安排了一次"数字化转型示范网点"创建项目的验收检查。', type:'narration' },
  { text:'肖明负责陪同检查组实地走访。走进基层网点后，他发现所谓的"数字化转型"项目基本停留在纸面上——系统采购了但没人会用，流程优化方案写了但没落地。', type:'narration' },
  { speaker:'赵磊', text:'（小声）老肖，一会儿检查组问起来，你就说系统已经上线运行了，数据我都提前准备好了。反正演示一下就行，他们也不会深究。', type:'dialogue' },
  { speaker:'肖明', text:'（看着网点里临时摆放的展板和匆忙打印的材料）这不就是搞验收走过场吗……', type:'thought' }
], choices:[
  { text:'如实汇报："检查组领导，项目还有一些落地的困难，我如实说一下现状和下一步计划。"', next:'ch2_honest', score:0 },
  { text:'配合演戏："来，我给各位领导演示一下我们的系统运行情况。"', next:'ch2_fake', score:-12 }
], regulation:{ title:'工作纪律', article:'整治搞验收走过场', content:'着力纠治搞验收走过场等问题。督查检查考核应当注重实效，不得搞花架子、做表面文章。对弄虚作假、欺上瞒下的行为要严肃追责问责。' }};

S.ch2_honest = { chapter:2, bg:'bg_inspection.jpg', dialogues:[
  { speaker:'肖明', text:'各位领导，说实话，这个项目在推进过程中遇到了一些实际困难。系统虽然采购了，但培训还没跟上，基层同志的使用率不高。我们已经制定了分步推进方案……', type:'dialogue' },
  { speaker:'检查组长', text:'（点点头）肖明同志这个态度很好。我们要的不是完美的汇报材料，是真实的进展和务实的计划。这才是实事求是的作风。', type:'dialogue' }
], next:'ch2_s2' };

S.ch2_fake = { chapter:2, bg:'bg_inspection.jpg', dialogues:[
  { text:'肖明按照赵磊准备的"剧本"，给检查组演示了一套提前录制好的系统运行画面。', type:'narration' },
  { speaker:'肖明', text:'（一边演示一边冒汗）希望他们不要现场点开后台看……', type:'thought' },
  { text:'检查组走后，一位基层员工私下拍了照片发到了内部论坛。真相，迟早会浮出水面。', type:'narration' }
], next:'ch2_s2' };

S.ch2_s2 = { chapter:2, bg:'bg_office_zhao.jpg', dialogues:[
  { text:'又过了一周，赵磊找到肖明。', type:'narration' },
  { speaker:'赵磊', text:'老肖，王总的意思，想在年底前搞一个"服务之星"评比表彰活动，再创建一个"合规示范单位"。这样年终汇报的时候有亮点。', type:'dialogue' },
  { speaker:'肖明', text:'（这种评比表彰活动，按规定需要上级批准才能开展……）赵磊，这个活动报批了吗？', type:'thought' },
  { speaker:'赵磊', text:'报什么批啊，咱们内部搞的，挂个名头就行。别的分公司都在搞，咱们不搞就落后了。', type:'dialogue' }
], choices:[
  { text:'坚持合规："这类评比表彰活动必须按规定报批，不能擅自开展。"', next:'ch2_proper', score:0 },
  { text:'随波逐流："那就搞吧，但别搞太大动静。"', next:'ch2_showy', score:-12 }
], regulation:{ title:'整治形式主义', article:'规范评比表彰', content:'严肃纠治违规变相开展评比表彰和创建示范活动等问题。开展评比表彰活动应当严格按照规定审批，不得擅自设立、不得变相开展，防止增加基层负担。' }};

S.ch2_proper = { chapter:2, bg:'bg_office_xiao.jpg', dialogues:[
  { speaker:'赵磊', text:'你也太较真了吧？', type:'dialogue' },
  { speaker:'肖明', text:'赵磊，不是较真。去年隔壁分公司就因为违规搞评比被通报了，你忘了？与其搞这些花架子，不如把精力放在真正提升服务质量上。', type:'dialogue' },
  { text:'赵磊虽然不太高兴，但也无话可说。', type:'narration' }
], next:'ch3_s1' };

S.ch2_showy = { chapter:2, bg:'bg_ceremony.jpg', dialogues:[
  { text:'肖明配合王总搞了一场声势浩大的"服务之星"评选活动。横幅、展板、奖杯一应俱全。', type:'narration' },
  { speaker:'肖明', text:'（看着会场里精心布置的展板）花了将近八万块，真正用在服务改进上的……一分钱都没有。', type:'thought' },
  { text:'活动照片发到朋友圈后不久，纪检监察部门就收到了匿名举报。', type:'narration' }
], next:'ch3_s1' };

// ========== 第三章：家风之考 ==========
S.ch3_s1 = { chapter:3, bg:'bg_home.jpg', dialogues:[
  { text:'周末，肖明回到家。妻子刘芳正在和母亲通电话。', type:'narration' },
  { speaker:'刘芳', text:'（挂了电话，叹气）你妈又打电话来了，说小杰的婚礼必须大办。还说对方家要十八万八的彩礼，咱家不能丢面子。', type:'dialogue' },
  { speaker:'肖明', text:'十八万八？！这也太……', type:'dialogue' },
  { speaker:'刘芳', text:'你妈说了，村里去年老张家嫁女儿收了二十万，咱们不能比人家少。还要摆三十桌酒席，请全村的人。', type:'dialogue' },
  { speaker:'肖明', text:'（揉了揉太阳穴）党员干部带头抵制高额彩礼、移风易俗，这可是明确要求的……可是母亲那边……', type:'thought' }
], choices:[
  { text:'移风易俗："妈那边我去说。婚礼简办，彩礼从简，咱们党员干部要带头。"', next:'ch3_simple', score:0 },
  { text:'大操大办："算了，就这一次，别让老人家不高兴了。"', next:'ch3_lavish', score:-12 }
], regulation:{ title:'生活纪律', article:'移风易俗', content:'严格家教家风，推进移风易俗，引导广大党员干部带头抵制高额彩礼、人情攀比、厚葬薄养等不良习俗，反对特权思想和特权现象，以优良党风引领企业风气、带动社风民风向上向善。' }};

S.ch3_simple = { chapter:3, bg:'bg_wedding.jpg', dialogues:[
  { text:'肖明专门回了趟老家，耐心地和母亲做了一下午的工作。', type:'narration' },
  { speaker:'肖明', text:'妈，小杰的婚礼咱们简办。彩礼意思一下就行，酒席就办八桌，请至亲好友。面子不是靠排场撑的，是靠人品挣的。', type:'dialogue' },
  { speaker:'母亲', text:'（虽然有些不情愿）你说的也有道理……那就听你的吧。', type:'dialogue' },
  { text:'婚礼当天，简朴而温馨。同事们纷纷点赞："肖总带头移风易俗，这才是新风尚。"', type:'narration' }
], next:'ch3_s2' };

S.ch3_lavish = { chapter:3, bg:'bg_wedding_lavish.jpg', dialogues:[
  { text:'婚礼那天，酒席摆了整整三十五桌。茅台酒、中华烟堆满了桌子。', type:'narration' },
  { speaker:'肖明', text:'（看着宾客名单里好几个业务合作方的名字，心里咯噔一下）怎么这些人也来了……', type:'thought' },
  { text:'几个合作方老板借着喝喜酒的名义，塞来了厚厚的红包。肖明推辞不掉，最终收下了近十万元的礼金。', type:'narration' },
  { speaker:'刘芳', text:'（晚上数着礼金，面带忧色）这些钱……咱能收吗？', type:'dialogue' }
], next:'ch3_s2' };

S.ch3_s2 = { chapter:3, bg:'bg_office_discuss.jpg', dialogues:[
  { text:'下周一。外地一家再保险公司来洽谈业务合作，肖明负责接待。', type:'narration' },
  { speaker:'赵磊', text:'老肖，我在"锦绣华庭"订了个包间，点了鲍鱼龙虾套餐，人均800。对方是大客户，不能怠慢。', type:'dialogue' },
  { speaker:'肖明', text:'人均800？公务接待标准不是人均不超过150吗？', type:'dialogue' },
  { speaker:'赵磊', text:'（不以为然）标准是标准，谈业务嘛，哪能太寒酸？别人请我们都是这个规格。再说了，发票可以分几次报。', type:'dialogue' }
], choices:[
  { text:'厉行节约："改到公司食堂的会议室接待，工作餐标准。光盘行动，够吃就行。"', next:'ch3_frugal', score:0 },
  { text:'超标接待："那就按你说的办吧，别让对方觉得咱们小气。"', next:'ch3_extravagant', score:-12 }
], regulation:{ title:'廉洁纪律', article:'中央八项规定', content:'紧盯公款吃喝、违规吃喝，违规超标准接待等问题。紧盯习惯过紧日子的要求落实情况，督促各级党组织规范公务接待活动。认真落实新时代廉洁文化建设，积极践行"光盘行动"，大力倡导尚俭戒奢、艰苦奋斗等优良作风。' }};

S.ch3_frugal = { chapter:3, bg:'bg_restaurant_simple.jpg', dialogues:[
  { text:'肖明把接待安排在了公司食堂的小会议室，四菜一汤，简洁高效。', type:'narration' },
  { speaker:'对方代表', text:'肖总这个安排好，务实！说实话，我们也不喜欢那种铺张的应酬，耽误时间。', type:'dialogue' },
  { text:'一个小时就谈完了合作框架，双方都很满意。', type:'narration' }
], next:'ch4_s1' };

S.ch3_extravagant = { chapter:3, bg:'bg_restaurant.jpg', dialogues:[
  { text:'锦绣华庭，龙凤包厢。满桌的鲍鱼龙虾，红酒是进口的拉菲。', type:'narration' },
  { text:'酒过三巡，业务只聊了十分钟，剩下的时间都在觥筹交错。这一顿饭花了一万二。', type:'narration' },
  { speaker:'赵磊', text:'（拿着发票）老肖，这发票我分三次报，挂到不同的项目费用里。', type:'dialogue' },
  { speaker:'肖明', text:'（看着那叠发票，感到一阵恶心）虚列费用……这不就是"五虚"之一吗？', type:'thought' }
], next:'ch4_s1' };

// ========== 第四章：廉洁之线 ==========
S.ch4_s1 = { chapter:4, bg:'bg_gift.jpg', dialogues:[
  { text:'临近年底，合作方张总登门拜访。', type:'narration' },
  { speaker:'张总', text:'肖总，一年来承蒙关照！一点心意，两条中华、一盒西湖龙井明前茶，还有一瓶三十年的茅台。您别推辞！', type:'dialogue' },
  { text:'张总把精致的礼盒放在了肖明桌上，里面的东西市值加起来少说也有上万块。', type:'narration' },
  { speaker:'肖明', text:'（看着桌上的礼盒，心里在激烈斗争）收还是不收……', type:'thought' }
], choices:[
  { text:'当场退回："张总，心意我领了，但东西必须带走。我们有纪律规定，您理解。"', next:'ch4_return', score:0 },
  { text:'笑纳收下："张总太客气了，那我就不见外了。"', next:'ch4_accept', score:-12 }
], regulation:{ title:'廉洁纪律', article:'收送礼品礼金', content:'紧盯违规收送高档烟酒茶、礼品礼金、名贵特产等问题。党员干部不得收受可能影响公正执行公务的礼品、礼金和有价证券等财物，违者视情节给予警告直至开除党籍处分。' }};

S.ch4_return = { chapter:4, bg:'bg_office_sunset.jpg', dialogues:[
  { speaker:'张总', text:'（尴尬地笑了笑）肖总您这……', type:'dialogue' },
  { speaker:'肖明', text:'张总，咱们合作靠的是专业和诚信，不是靠这些。您把东西拿回去，有好的合作方案随时可以谈。', type:'dialogue' },
  { text:'张总走后，肖明在办公室坐了很久。窗外，夕阳把天边染成金红。他知道自己做对了。', type:'narration' }
], next:'ch4_s2' };

S.ch4_accept = { chapter:4, bg:'bg_gift.jpg', dialogues:[
  { text:'张总走后，肖明打开礼盒，茅台酒在灯光下泛着琥珀色的光。', type:'narration' },
  { speaker:'肖明', text:'（把礼盒藏到文件柜最里面）就这一次……过年了嘛，人之常情。', type:'thought' },
  { text:'但他不知道，公司的监控摄像头忠实地记录下了一切。', type:'narration' }
], next:'ch4_s2' };

S.ch4_s2 = { chapter:4, bg:'bg_home_morning.jpg', dialogues:[
  { text:'周六上午。肖明的私家车送去保养了。', type:'narration' },
  { speaker:'刘芳', text:'明天是你妈生日，得去一趟超市买东西，没车怎么去？', type:'dialogue' },
  { speaker:'肖明', text:'（突然想到公司配给部门的那辆公务用车，钥匙就在办公桌抽屉里）', type:'thought' },
  { speaker:'赵磊', text:'（发来微信）老肖，你要用车？周末公车没人用，你开去用就是了。上次李主任周末还开公车去钓鱼了呢。', type:'dialogue' }
], choices:[
  { text:'坚决拒绝："不行，公车私用是红线。我打车去。"', next:'ch4_refuse', score:0 },
  { text:'偷偷使用："那我借用一下，明天就还。"', next:'ch4_use', score:-12 }
], regulation:{ title:'廉洁纪律', article:'公车私用', content:'紧盯公车私用、"私车公养"等问题。公务用车实行集中管理、统一调度，严禁公车私用。倡导绿色出行，党员干部应当带头践行节约理念。' }};

S.ch4_refuse = { chapter:4, bg:'bg_home.jpg', dialogues:[
  { speaker:'刘芳', text:'那咱打车去？', type:'dialogue' },
  { speaker:'肖明', text:'嗯，打车去。公车就是公车，不能因为方便就破例。绿色出行也挺好的。', type:'dialogue' },
  { text:'那天他们坐地铁转了一趟公交，给母亲买了蛋糕和新衣服。虽然辗转了一点，但心里踏实。', type:'narration' }
], next:'ch5_s1' };

S.ch4_use = { chapter:4, bg:'bg_car.jpg', dialogues:[
  { text:'肖明偷偷开着公务用车去了超市，又去了母亲家。', type:'narration' },
  { speaker:'肖明', text:'（把车停在小区门口，左顾右盼）应该没人看见吧……', type:'thought' },
  { text:'他不知道的是，公车上装有GPS定位系统，每一段行程都有记录。', type:'narration' }
], next:'ch5_s1' };

// ========== 第五章：最终审视 ==========
S.ch5_s1 = { chapter:5, bg:'bg_office_sunset.jpg', dialogues:[
  { text:'年底，总公司纪检监察部派驻检查组进驻分公司，开展专项巡查。', type:'narration' },
  { text:'检查组重点核查了三个问题：一是经营数据的真实性；二是员工反映的奖金被克扣问题；三是多笔不明费用支出。', type:'narration' },
  { speaker:'肖明', text:'（看着检查组进进出出的身影，坐在办公桌前，手指无意识地敲击着桌面）', type:'thought' },
  { text:'走廊尽头，赵磊被两名工作人员请去了谈话室。办公室里安静得可怕。', type:'narration' },
  { speaker:'肖明', text:'（站在窗前，看着楼下的停车场。那辆他曾偷偷开过的公务车静静地停在那里。这一年，自己走过的每一步，都像脚印一样清晰地印在了雪地上。）', type:'thought' },
  { text:'窗外，冬日的夕阳把天边染成一片苍茫。新的一年即将到来，而他的故事，早已在一个个选择中写下了结局。', type:'narration' }
], next:'__ending__' };

export const storyScenes = S;

