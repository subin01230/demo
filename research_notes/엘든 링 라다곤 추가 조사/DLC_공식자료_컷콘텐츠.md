# 라다곤 추가 조사 — DLC 텍스트 · 게임 외부 공식 자료 · 컷 콘텐츠/데이터마인 · 제작 배경

> 상태: **중간 저장본 v2(조사 진행 중, 2026-11-23)**. 1·2·7절은 1차 자료 대조 완료, 3~6·8절은 보강 중.
> 근거 수준: **[확정]**=게임 내 텍스트/공식 발언, **[유력]**=다수 합의, **[이론]**=추측. 데이터마인·컷 콘텐츠·1.00판 텍스트는 **[비정식]**(정식 설정 아님)으로 별도 표기.
> 1차 자료(직접 내려받아 전수 검색한 것):
> - **DLC 텍스트 덤프** "The Impaler's Archive"(ividyon, DLC 출시 버전 FMG 추출, 최종 푸시 2024-06-24, 영/일만 수록) — 저장소 https://github.com/ividyon/Impalers-Archive , EN https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html , JP https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html (이하 "IA-EN", "IA-JP")
> - **1.00(디스크판) vs 정식판(1.06) 텍스트 비교 시트** "Elden Ring Research — 1.0 versus Release Comparison Sheet"(ivi#0451 편찬, 2022-09) — https://docs.google.com/spreadsheets/d/1sNdk4_sm4Jw3mIZTTmooJ2NOSsRVugSwaZJEje2axyg (이하 "1.0 비교 시트")
> - 한국어 원문은 위 덤프에 없어 별도 확인분만 기재(미확인은 '미확인' 표기).

## 1. DLC에서 라다곤의 이름이 직접 등장하는 텍스트가 있는가

### Takeaway
DLC 텍스트 파일 전체(영·일)에서 "Radagon/ラダゴン"은 **단 1회**, 그것도 아이템 텍스트가 아니라 라단의 대사 데이터(TalkMsg_dlc01, ID 21040100)에만 나온다. 이 대사는 음성이 없고 게임에서 재생되지 않는 미사용 대사로 보도되었으므로, 정확한 표현은 **"플레이어가 실제로 접하는 DLC 텍스트 기준 직접 언급 0건 / 데이터상 미사용 대사 1건"**이다. 아이템명·아이템 설명에는 0건.

### Cited Findings
- [확정·전수검색] DLC 영어 텍스트 전체에서 "Radagon" 1건: `[21040000] I am Radahn.` `[21040100] Born of red-maned Radagon, and Rennala of the Full Moon.` `[21040200] A lion bred for battle.` (TalkMsg_dlc01.fmg, 대화 그룹 0210, Section 40. 같은 그룹의 Section 20은 미켈라의 "Lord brother. I'm going to be a god…", Section 41은 2페이즈 미켈라의 "My loyal blade. And champion of the festival…"로 실제 사용되는 컷신 대사) — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- [확정·전수검색] DLC 일본어 텍스트 전체에서 "ラダゴン" 1건(동일 ID): `[21040000] …我は、ラダーン` `[21040100] 赤髪のラダゴンと、満月のレナラの子` `[21040200] …獅子の、戦士だ` — [IA-JP](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html)
- [비정식·컷 대사] 위 3행은 Reddit 이용자 LaMi_1이 r/EldenRingLoreTalk에 올려 알려졌고, VGC는 "It's currently unclear if recorded version of the lines exist, or if there is any way to trigger them in-game, but it doesn't appear likely."라고 보도(음성 없이 텍스트로만 존재, 최종전에서 라단은 말이 없고 미켈라만 대사가 있다고 설명). 2024-07-05, Jordan Middler — [VGC](https://www.videogameschronicle.com/news/cut-dialogue-found-for-shadow-of-the-erdtree-final-boss/) (원 출처 스레드: https://www.reddit.com/r/EldenRingLoreTalk/comments/1duo7us/cut_dialogues_from_dlc_spoilers — 직접 열람은 못 함)
- [확정·전수검색] DLC의 아이템명·설명 FMG(Accessory/Goods/Weapon/Protector/Gem/Arts)에는 "Radagon/ラダゴン" 0건. "red hair/赤髪"도 DLC 전체에서 2건뿐: 위 미사용 대사와 Young Lion's Helm의 "Proudly displaying his heroic red hair"(라단) — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- [확정·전수검색] "Melina"는 DLC 영어 텍스트에서 0건, "Golden Order"는 2건(Multilayered Ring of Light의 "Golden Order fundamentalism", 그리고 한 전투 기술 설명의 "There is something of the Golden Order in the sight of those fixed upon this crux."), "Elden Lord"는 Godfrey 관련 4건뿐(라다곤 아님) — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)

### Inferences
- 기존 보고서 §7의 "DLC는 라다곤의 기원을 끝내 밝히지 않았다"는 서술은 전수 검색으로 뒷받침되며, 더 강하게 "DLC의 실사용 텍스트는 라다곤을 한 번도 호명하지 않는다"고 쓸 수 있다.
- 유일한 호명이 "라단의 혈통 자기소개"(미사용)라는 점은, 개발 단계에서 DLC가 라다곤을 다룬 방식이 '라단의 아버지'라는 본편 기존 사실의 반복에 그쳤음을 시사한다(추론).

### Gaps
- 덤프는 DLC 출시 시점(2024-06) 기준. 이후 패치(1.12.x~1.16)에서 DLC 텍스트에 라다곤이 추가됐다는 보도는 찾지 못했으나, 최신 버전 FMG를 직접 대조하지는 못함.
- 한국어판 해당 문자열 및 한국어 DLC 텍스트 전수 검색: 미확인(한국어 덤프 미확보).
- 원 Reddit 스레드 직접 열람 불가(차단) — VGC 보도로 대체.

## 2. DLC에서 라다곤 해석에 간접적으로 쓰이는 텍스트의 정확한 원문과 논리의 확정/추론 경계

### Takeaway
간접 근거는 모두 "마리카·무녀·신의 문·메스메르·미켈라/라단"에 관한 텍스트이며, **어느 것도 라다곤과의 연결을 텍스트로 말하지 않는다** — 연결은 전부 추론이다. 또한 기존 보고서의 영문 인용 *"the flesh of a shaman blends well with the flesh of others"* 는 실제 문장이 아니다: 실제 출처는 무기 **Tooth Whip(歯の鞭)**의 *"The flesh of shamans was said to meld harmoniously with others."*(「巫子たちは、他の肉とよく馴染んだという」)이다.

### Cited Findings
**(a) 무녀(샤먼)의 살 / 무녀 마을 / 땋은 머리**
- [확정] **Tooth Whip / 歯の鞭** (무기 ID 20500000). EN: "Whip bestrewn with rotting, misshapen teeth. Filthy and seething with disease, the teeth are embedded in the whip and dose the victim with deadly poison upon each strike. As the wounds ripen they grow inflamed and ooze pus. The flesh of shamans was said to meld harmoniously with others." JP: 「醜い歯を不揃いに並べ、埋め込んだ鞭／汚れた歯は、あらゆる雑菌に塗れており／その歯傷には猛毒が蓄積する／やがて、傷はじゅくじゅくと膿み爛れ／巫子たちは、他の肉とよく馴染んだという」 — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html) / [IA-JP](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html)
- [확정] 감옥(gaol) 영체 대사 [1500200010~40]. EN: "For pity's sake, your place is in the jar. / Nigh-sainthood itself awaits you within. / For shamans like you, this is your lot. / Life were you accorded for this alone." JP: 「…さあ、大人しく壺に入りなさい／そして、善き人になりなさい／お前たちは、巫子なのだから／そのために、生まれてきたのだから」 — 같은 출처
- [확정] **Innard Meat** (ID 2001700) EN: "This is what becomes of the condemned, who get sliced up and stuffed into jars to become saints instead." / **Greatjar** (방어구 ID 5320000) EN: "Attire of the shamans who perform their worship at gaols. … They offer their prayers to the innards of the greatjars, such that they might be reborn one day into sainthood." / 혈흔 메시지 [3050] EN "Have mercy. For the spirited-away shamans." JP 「慈悲を。攫われた巫子たちに」 — 같은 출처
- [확정] **Golden Braid / 黄金の編み髪** (탈리스만 ID 7120). EN: "A braid of golden hair, cut loose. / Queen Marika's offering to the Grandmother. / Boosts holy damage negation by the utmost. / What was her prayer? Her wish, her confession? / There is no one left to answer, and Marika never returned home again." JP: 「切り落とされた黄金の編み髪／女王マリカの、大母への供物／聖カット率を、最も大きく高める／彼女が何を祈り、願い、告解したのか／知る者は誰もいない。ただその後に／マリカが故郷に戻ることはなかった」 — 같은 출처
- [확정] **Minor Erdtree / 小黄金樹** (기도 ID 2006670). EN: "Secret incantation of Queen Marika. / Only the kindness of gold, without Order. / Creates a small, illusory Erdtree that continuously restores the HP of nearby allies. / Marika bathed the village of her home in gold, knowing full well that there was no one to heal." JP: 「女王マリカの秘めたる祈祷／優しいだけの、律無き黄金／小さな黄金樹の幻影を生じ／周囲の味方のＨＰを持続的に回復する／マリカは故郷の村を黄金で包んだ／癒すべき何者も、いないと知っていても」 — 같은 출처
- [확정] 지명 "Shaman Village / 巫子の村" [6934600] — 같은 출처. DLC 전체에서 "shaman/巫子"는 5곳(혈흔 메시지·지명·Greatjar·감옥 대사·Tooth Whip)에만 나오며, **"마리카는 무녀였다"고 문장으로 명시한 텍스트는 없다**(전수 검색) — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- [확정] 뿔 달린 자들의 마리카 호칭: Hornsent Grandam "A curse upon the strumpet's progeny, upon Marika's children each and all." 「奸婦の子、マリカの子らの、すべてに…」; Hornsent "The Erdtree is my peoples' enemy—By Marika long betray'd, set aflame." 「…黄金樹は敵だ。マリカは我らを裏切り、火をかけた」 — 같은 출처

**(b) 신의 문·비밀 의식(신·왕·그릇)**
- [확정] **Secret Rite Scroll / 秘儀の巻物** (ID 2008014). EN: "A scroll made of white tree bark. / Few can decipher the scroll, which describes the secret rite of the divine gateway said to be found at the tower enshrouded by shadow. / "A lord will usher in a god's return, and the lord's soul will require a vessel."" JP: 「白い樹皮の巻物／影に隠された塔にあるという／神の門の秘儀が記されている／だが、読み解けるのは、ごく一部だ／神の帰還は王により導かれ／王の魂には、依り代が求められる」 — 같은 출처
- [확정] Ansbach 대사 [1161000040~60]. EN: "As if using Lord Mohg to gain entrance to the land of shadow were not enough, he plans to use his corpse as the vessel of his king consort. He has forsaken Lord Mohg's soul. He desires only his empty shell." JP: 「モーグ様を利用し、影の地に至るだけでは飽き足らず／その遺体をすら、王の依り代にしようなどと／魂など必要なく、ただ、空っぽの肉体だけを求めるなどと」 — 같은 출처
- [확정] **Light of Miquella / ミケラの光** (기도 ID 2006700). EN: "Miquella sought to accept all that was and would be, but found one that refused to be embraced. No wonder, as one god, and one king consort, is all the world needs." JP: 「ミケラは、全てを受け容れ、抱こうと望み／だがひとつだけ、そうできぬものを知っていた／絶対の神も、その王も／決して並び立つことはない」 — 같은 출처. (번역 차이 주의: 일본어는 "절대의 신도, 그 왕도 결코 나란히 설 수 없다"로, 영어의 "one god, and one king consort, is all the world needs"와 뉘앙스가 다르다.)
- [확정] Hornsent의 플레이어 호칭 "Lord of the Erdtree, Lord of Marika..." 「お前が、黄金樹の、マリカの王ならば」; 미켈라의 호칭 "Aspiring Lord of the old order." 「旧律の王たる者よ」 — 같은 출처
- [확정] 신의 문 관련 십자 메시지: "The Gate of Divinity lies in the tower sealed by shadow. That is surely where Kind Miquella is headed. We are no Empyreans, but we must locate the path that will lead us there." — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- [해당 없음] "seduction", "betrayal", "affair"로 시작하는 마리카 신격화 서술("It began with a seduction and a betrayal…")은 DLC 게임 내 텍스트 파일에는 없다(IA-EN 전수 검색 0건). 스토리 트레일러 내레이션 출처 확인은 조사 중.

**(c) 메스메르 — 붉은 머리·아버지·여동생**
- [확정] **Remembrance of the Impaler / 串刺し公の追憶** (ID 2002901). EN: "A malevolent snake writhed within Messmer, and so his very mother plucked out his eye and put in its place a seal of grace. Yet, having done so, her fear compelled her to secret away her child within the realm of shadow. Hidden away—keeping company with the original sin, and a hatred that would not be confined." JP: 「メスメルの中には、邪な蛇が蠢いていた／母は、その瞳を封印の祝福に入れ替え／それでもなお、彼を影に隠した／はじまりの罪と、忘れ得ぬ憎しみと共に」 — 같은 출처
- [확정] **Messmer's Kindling / メスメルの種火** (ID 2008021). EN: "Messmer, much like his younger sister, bore a vision of fire." JP: 「メスメルもまた、その妹と同じように／火の幻視を宿していた」 — 같은 출처. **여동생의 이름은 적혀 있지 않다.**
- [확정] 병사 영체 대사 [1500217030] "Messmer is the son of Queen Marika..." 「メスメル様は、マリカ様の息子」; 메스메르 대사 [21060200~300] "Mother, wouldst thou truly Lordship sanction, in one so bereft of light?" 「母は、本当に、王たるを託したのか…光無き者などに」; **Blessing of Marika** (ID 2000900) "Marika once created several of these physicks for Messmer's sake. But never again." 「彼女は、メスメルのために、この霊薬を幾つか作った／その後、二度とそうすることはなかった」; **Messmer's Orb** "Messmer despised his own fire. Time and time again he hoped to rid himself of it, but ever did it burn." 「メスメルは、自らの火を憎んでいた／故に幾度となく、それを潰し／消し去ろうとした」 — 같은 출처
- [확정·전수검색] DLC 텍스트에는 **메스메르의 머리색을 묘사하는 문장이 없고**("hair" 5건: Golden Braid, Thiollier 2건, Rellana's Helm, Young Lion's Helm), **메스메르의 아버지를 언급하는 문장도 없다**("father" 2건: Huw의 아버지 Andreas, "Father Dane"). 붉은 머리는 모델·아트상의 시각 정보일 뿐이다 — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)

**(d) 라단(미켈라의 약속된 왕)**
- [확정] **Remembrance of a God and a Lord / 神と王の追憶** (ID 2002907). EN: "In their childhood, Miquella saw in Radahn a lord. His strength, and his kindness, that stood in stark contrast with their afflicted selves. And so Miquella made his heartfelt wish. That Radahn would one day be his king consort." JP: 「幼き日、ミケラはラダーンに王を見た／脆弱な自分たちにはない、強さを／そして優しさを／だからミケラは純真に願った／私の王に、なってください」 — 같은 출처
- [확정] **Young Lion's Helm / 若獅子の兜** (ID 5270000). EN: "The golden helm worn by Radahn in his younger years. Proudly displaying his heroic red hair, it is fitting attire for a lion. When Malenia, Blade of Miquella, let the rotflower blossom in Aeonia, Radahn heard a murmur in his ear— "Miquella awaits thee, O promised consort."" JP: 「若きラダーンの黄金の兜／英雄の赤髪を誇る、獅子の装備／ミケラの刃、マレニアは／エオニアに腐敗の花を咲かせるその時／ラダーンの耳元で囁いたという／ミケラが待っている。約束の王を」 — 같은 출처
- [확정] 미켈라 대사 "Lord brother. / I'm going to be a god. / If we honour our part of the vow, promise me you'll be my consort." ; "Now, the vow will be honoured, and my Lord brother's soul will return. So that he may be my consort." — [IA-EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)

**(e) 렐라나(레날라의 여동생)**
- [확정] **Rellana's Helm / レラーナの兜** (ID 5260000). EN: "Rennala, head of the royal family of Caria, was said to have given her younger sister, who renounced her lineage to chase after Messmer, a gift of lustrous black hair." JP: 「カーリア王家の長であったレナラは／家を捨て、メスメルを追った妹に／艶やかな、長い黒髪を贈ったという」 — 같은 출처
- [확정] **Remembrance of the Twin Moon Knight** (ID 2002903). EN: "Once a Carian princess, Rellana disavowed her birthright and chose to stand at Messmer's side instead, knowing full well that not even the brilliance of the moon could grant him succor. Before long, she became known as the Sword of Messmer." JP: 「かつてカーリアの王女であった彼女は／生家を捨て、メスメルの傍らを選んだ／月の輝きが、その男を癒せぬと知っていても／メスメルの剣。いつか彼女はそう呼ばれた」; **Rellana's Twin Blades** "Here, and here alone, were moon and fire ever together." 「月と火は、ここでは常に共にあった」; **Rellana's Twin Moons** "In her childhood, she and her elder sister Rennala met these moons." 「幼き日、姉レナラと共に出会った月」 — 같은 출처

**(f) 미켈라와 황금률(원리주의)·신격의 감옥**
- [확정] **Multilayered Ring of Light / 重なり合う光輪** (ID 2006710). EN: "This light-ring incantation was cultivated by a tradition separate from Golden Order fundamentalism." JP: 「黄金律原理主義とは別系統で／研鑽された光輪の技」 — DLC에서 "원리주의"가 나오는 유일한 문장 — 같은 출처
- [확정] Ansbach [1160400020~60] "Tender Miquella's eye is no mere morsel of flesh. It is a vessel of soaring grace. Proof of his Empyrean lineage. … does Miquella the Kind intend to sever his very birthright? His fate as a child of the Erdtree?" 「それは、特別な祝福の宿るもの。黄金樹の神人たる証／…ミケラ様は、断ち切るつもりなのでしょうか？／黄金樹の子たる宿命を」 — 같은 출처
- [확정] St. Trina [1050300000~10] "Godhood would be Miquella's prison. A caged divinity...is beyond saving." 「…あの子にとって、神は牢獄／檻の中の神は、誰も救えない」; Leda [1180450050] "She is, after all, his other half." 「自らの半身として。あるいはそれ以上に」 — 같은 출처
- [확정] Ymir [1200800040~50] "There never was any hope. They were each of them defective. Unhinged, from the start. Marika herself. And the fingers that guided her." 「最初から、壊れていたのですよ。狂っていたのですよ／マリカが。彼女を導いた指たちが」 → [1201100020~30] "Well, the truth lies deeper still. It is their mother who is damaged and unhinged." 「けれど、あれは真実ではありません…真に壊れていたのは、狂っていたのは、母なのです」 — 같은 출처
- [확정·본편 대조용] 본편 '라다곤의 광륜'(Radagon's Rings of Light, 정식판): "A gift of gratitude to the young Miquella from his father, Radagon. … And yet, the young Miquella abandoned fundamentalism, for it could do nothing to treat Malenia's accursed rot. This was the beginning of unalloyed gold." 「父ラダゴンの、幼きミケラへの返礼…しかし、幼きミケラは原理主義を捨てた…無垢なる黄金、そのはじまりである」 — [1.0 비교 시트(정식판 열)](https://docs.google.com/spreadsheets/d/1sNdk4_sm4Jw3mIZTTmooJ2NOSsRVugSwaZJEje2axyg)

### Inferences (라다곤과 연결하는 논리의 확정/추론 경계)
- **샤먼 융합설**: [확정] 무녀의 살이 "다른 살과 잘 섞인다"(Tooth Whip), 무녀는 항아리 '성인'의 재료였다(감옥 대사·Innard Meat·Greatjar). [유력·사실상 합의] 마리카가 무녀 마을 출신(=무녀)이라는 것 — "village of her home" + 그 기도·탈리스만이 Shaman Village에서 입수된다는 배치에서 도출되며 문장으로 명시되진 않는다. [이론] 그 체질이 라다곤과의 '한 몸'을 설명한다는 것 — 텍스트는 무녀의 살을 **항아리 제작 맥락**에서만 말하며, 마리카/라다곤/융합을 언급하지 않는다.
- **신의 문·비밀 의식**: [확정] "신의 귀환은 왕이 이끌고, 왕의 혼에는 그릇(依り代)이 필요"하며 미켈라가 모그의 시신을 라단의 그릇으로 썼다는 것. [이론] 마리카가 신이 될 때도 같은 구조(왕+그릇)가 있었고 그 '왕' 또는 '그릇'이 라다곤과 관련된다는 것 — 마리카의 승천 절차를 서술한 게임 내 텍스트는 없다.
- **메스메르·멜리나**: [확정] 메스메르는 마리카의 아들, '여동생'이 있고 둘 다 '불의 환시'를 지녔다. [유력] 그 여동생=멜리나(DLC는 이름을 쓰지 않음. 본편 멜리나의 '불씨' 역할과의 대응에서 추론). [이론] 아버지=라다곤(붉은 머리라는 시각 정보뿐. 머리색·부친 텍스트 0건). 기존 보고서 §3의 "[이론]" 등급은 타당하나, "붉은 머리의 텍스트 근거도 없다"는 점을 덧붙여야 한다.
- **라단·미켈라**: [확정] 라단은 라다곤·레날라의 아들(본편), 미켈라는 마리카·라다곤의 아들(본편), 미켈라가 라단을 '왕(반려)'으로 삼으려 함(DLC). 즉 **신-왕 한 쌍이 모두 라다곤의 자식**이라는 사실관계는 확정. [해석] 이것이 마리카–라다곤(신–왕, 한 몸)의 반복/변주라는 독해는 추론.
- **렐라나**: [확정] 레날라의 여동생이 메스메르를 좇아 가문을 버림. [해석] '달(카리아)과 불/황금(황금 나무 측 붉은 머리 남성)'의 결합이 레날라–라다곤과 평행한다는 독해는 추론 — 렐라나 텍스트에 라다곤은 없다.
- **미켈라의 결별**: [확정] 미켈라가 원리주의를 버렸다는 것은 본편 텍스트, DLC는 "원리주의와 다른 계통의 광륜"과 "황금 나무의 자식이라는 숙명을 끊으려 한다", "신격은 감옥"을 추가. [해석] '감옥으로서의 신격'을 황금 나무에 갇힌 마리카/라다곤에 겹쳐 읽는 것은 추론.
- **'반신(半身)' 표현**: Leda가 트리나를 미켈라의 "other half/自らの半身"이라 부르는 것은 [확정]. 이를 마리카–라다곤과 같은 구조로 보는 근거는 게임 밖 공식 발언(3절의 미야자키 Future Press 인터뷰 "Similar to how Queen Marika and Radagon are one being…")에 있다.

### Gaps
- 한국어판 원문(이빨 채찍·황금 땋은 머리·작은 황금 나무·비의의 두루마리 등): 조사 중.
- DLC 스토리 트레일러 내레이션("seduction and betrayal…")의 공식 원문·날짜: 조사 중.
- 마리카의 승천 절차·라다곤의 발생 시점을 서술한 DLC 텍스트: **해당 없음**(IA-EN/JP 전수 검색에서 관련 문장 없음).

## 3. 개발진 인터뷰에서의 마리카/라다곤 직접 언급 (조사 중 — 확인분만)

### Cited Findings
- [확정·공식 발언] 미야자키 히데타카, Future Press 『Elden Ring Official Strategy Guide / Books of Knowledge Vol. II』 수록 인터뷰(2023-09-11 기재): 라니의 두 얼굴을 설명하며 "Similar to how Queen Marika and Radagon are one being, it touches on the nature of Empyreans and the multiple different aspects they can possess." — [eldenring.wiki.gg Interviews(전재)](https://eldenring.wiki.gg/wiki/Interviews) (원 출처 서적: https://www.future-press.com/books/elden-ring-vol2/ ). 2차 교차 확인 조사 중.
- [확정·공식 발언] 미야자키, 패미통 2024-02 인터뷰(영역 전재): "The other main focus of the DLC story will be the past of the Land of Shadows and the past of Queen Marika." — [eldenring.wiki.gg Interviews](https://eldenring.wiki.gg/wiki/Interviews) (원문: https://www.famitsu.com/news/202402/22335199.html — 일본어 원문 대조 조사 중)
- [확정·공식 발언] 미야자키, 패미통 2021-06-14: 마틴의 역할 「本作の土台となる世界観を構築していただいた、というのが正しい言いかたになるかと思います。」, 데미갓 「“デミゴッド”と呼ばれる一族、神たる女王マリカの血を受け、とくに強い祝福を受けた英雄たちが治めています。」 (이 인터뷰에 라다곤 언급 없음) — [ファミ通](https://www.famitsu.com/news/202106/14223605.html)

## 4. 조지 R.R. 마틴 (조사 중 — 확인분만)
- GRRM 이니셜 설(Godfrey·Rennala·Radagon·Marika)과 마틴의 부인(2022-03 Not A Blog "This, That, and t'Other Things"로 보도됨): [PC Gamer](https://www.pcgamer.com/george-rr-martin-didnt-hide-his-initials-in-elden-ring-on-purpose-apparently), [GamesRadar](https://www.gamesradar.com/elden-rings-demigods-arent-named-after-george-rr-martin-after-all). 블로그 원문 확인 조사 중.

## 6. 후속 전개 (조사 중 — 확인분만)
- 실사 영화: A24·알렉스 갈런드 각본/감독, **2028-03-03 개봉 예정(미개봉)**, 2026-04 캐스트 발표, 배역 미공개 — [Engadget](https://engadget.com/entertainment/tv-movies/the-elden-ring-movie-hits-theaters-on-march-3-2028-154411670.html), [GamesRadar](https://www.gamesradar.com/entertainment/fantasy-movies/elden-ring-movie-sets-2028-release-date-full-cast-and-confirms-it-will-be-filmed-for-imax/)
- Tarnished Edition(Switch 2): **2026-08-28 발매**(2025년 예정에서 연기), 타 기종은 같은 날 'Tarnished Pack' DLC. 신규 방어구·토렌트 외형 등, 스토리/라다곤 관련 추가 언급 없음 — [Game Informer 2026-06-04](https://gameinformer.com/2026/06/04/elden-ring-tarnished-edition-for-nintendo-switch-2-releases-in-august)

## 7. 컷 콘텐츠·데이터마인·1.00판 텍스트 (1.00 대조 완료, 모델/데이터마이너 부분 조사 중)

### Takeaway
1.00(디스크판)의 텍스트에는 라다곤에 관한 **정식판에서 사라진 설정 3가지**가 남아 있다: ①미켈라의 성수를 섬기는 기사단 'Arbor Sentinels'를 **왕배 라다곤이 미켈라에게 하사**했다는 설정(→정식판에서 로레타 개인 설정으로 교체), ②'휘석의 크리스'가 **라다곤과 레날라의 혼인을 축하한 보검**이라는 일본어 설명(→"로데일과의 화친을 축하"로 교체), ③기도 '라다곤의 광륜'의 1.00 명칭이 **'聖律の戒め / Divine Law's Punishment'**였다는 점. 모두 [비정식]이다.

### Cited Findings (전부 [비정식] — 1.00판은 디스크에만 실린 초기 빌드)
- **로레타 세트(1.00: 'Arbor Sentinels' 세트)** 방어구 ID 280000~281100. 1.00 EN: "Silver armor of the Arbor Sentinels who serve the sacred tree of Miquella, the Scion Empyrean. Hailing from Raya Lucaria, these enchanted knights once belonged to the Carian royal family, but were later gifted to Miquella, recipient of the Vision, by King Consort Radagon. The lapis blue trimmings reveal these origins." 1.00 JP: 「神の子ミケラの聖樹に仕えた／アーバーガードの銀鉄の胴鎧／彼らは皆レアルカリアの出身であり／王配ラダゴンが、幻視を得たミケラに贈った／カーリア王家直属の魔術騎士である／瑠璃青のマントは、その象徴なのだ」 → 정식판 EN: "Silver armor of Loretta, a knight who served Miquella's Haligtree. Loretta was once a royal Carian knight, and her lapis-lazuli blue cape is the emblem of the knightly pride that continues to guide her." — [1.0 비교 시트](https://docs.google.com/spreadsheets/d/1sNdk4_sm4Jw3mIZTTmooJ2NOSsRVugSwaZJEje2axyg)
- **Glintstone Kris / 輝石のクリス** (무기 ID 1070000). 1.00 JP: 「かつて、レアルカリアの学院が／ラダゴンとレナラの婚姻を祝した宝剣／希少な輝石が、黄金樹風の意匠で飾られており／曲がった刃は古い儀式の象徴でもある／学院は、そうした儀式を嘲笑していた」 → 정식판 JP: 「かつて、レアルカリアの学院が／ローデイルとの和睦を祝した宝剣／…」; 1.00 EN "…presented to Leyndell by the Academy of Raya Lucaria as a token of peace." → 정식판 EN "…to celebrate their newfound peace." — 같은 출처
- **Radagon's Rings of Light / ラダゴンの光輪** (기도 ID 6710): 1.00 명칭 EN "Divine Law's Punishment" / JP 「聖律の戒め」, 1.00 설명은 효과문뿐("Light ring forms at feet damaging nearby enemies" / 「術者から広がる光輪を発生させ、周囲を攻撃する」). '아버지 라다곤이 어린 미켈라에게 준 답례' 서술은 정식판에서 처음 들어감 — 같은 출처
- **Golden Order Principia** (ID 8862): 1.00 명칭 JP 「黄金律の祈祷書」 EN "Golden Order Prayerbook" → 정식판 JP 「黄金律原論」 EN "Golden Order Principia". (기존 보고서 §9-6의 표기 논점: 정식판 일본어 명칭은 「黄金律原論」이며 「黄金律言論」이 아니다.) — 같은 출처
- **Gold Breaker(엘든의 잔해 전투 기술, Arts ID 1029)**: 1.00 EN "Skill: Sacred Impact …" JP 「戦技「黄金砕き」 身体を跳躍させ、宙を漂った後 叩きつけと同時に聖属性の衝撃波を起こす戦技」 → 정식판 EN "…The heroic Radagon's signature attack." JP 「…ラダゴンの英雄的殴打」 — 같은 출처
- **영어판에만 남은 더 오래된 초안(1.00 영어 = 구 번역, 1.00 일본어는 이미 정식판과 동일한 항목)**: ①지도 'Map: Limgrave, East' 1.00 EN "Map of the eastern region of Tenebrae. The demesne of Tenebrae, far south of the capital, stands vigil before the vast Sea of Fog. Radagon's warning is yet told and retold. That one day, the Tarnished led into war will cross the Sea of Fog and return. For the Elden Ring." ②'Winged Misbegotten Ashes' 1.00 EN 요약문 "Summons Radagon's Chimera", 설명 "Summons the spirit of a Radagon chimera…" ③'Elden Remembrance' 1.00 EN "Rune belonging to Marika. One of the runes of power…"(1.00 JP는 이미 「エルデの獣の追憶…それは、大いなる意志の眷獣であり 律たる概念の具現である」) ④라단의 대룬 1.00 EN "A large shard, found in hand of Radahn the Starscourge. This shard is from one of the four large rings that make up the Elden Ring." — 같은 출처
- **1.00과 정식판에서 동일한 것(변경 없음)**: 보스명 "Radagon of the Golden Order / 黄金律、ラダゴン", "Elden Beast / エルデの獣", NPC명 "Fractured Marika / 壊れかけのマリカ", "Red Wolf of Radagon / ラダゴンの赤狼", 탈리스만명(ラダゴンの刻印/爛れ刻印/肖像), 기도명 "Law of Regression / 回帰性原理", 선택지 「「ラダゴンとはマリカである」と伝える」(1.00 EN "Tell them that Radagon is Marika" → 정식판 "Tell him that Radagon is Marika"), 검의 비석 "The First Liurnian War / Radagon's glory burns red as his hair"(「第一次リエーニエ戦役 赤髪のラダゴン、英雄となる」) — 같은 출처
- **사소한 문구 수정**: Radagon's Soreseal 1.00 EN "The weight of a heavy duty gnaws away at the one charged with carrying it out, like a curse from which there is no deliverance." → 정식판 "Solemn duty weighs upon the one beholden; not unlike a gnawing curse from which there is no deliverance."(일본어 「強き使命は、その主を蝕む まるで逃れ得ぬ呪いのように」는 동일, 정식판에 「「伝説のタリスマン」のひとつ」 추가); Giant's Red Braid 1.00 EN "Perhaps that was a curse of the giants." → "Perhaps that was a curse of their kind."; Marika's Hammer "splintered with runes" → "splintered with rune fragments"; 라단 대룬 1.00 JP 「その右側の大ルーンは、燃えている」 → 「その大ルーンは、燃えている」 — 같은 출처
- 1.00의 대화문(TalkMsg)에서 라다곤이 나오는 25개 항목 중 정식판과 다른 것은 철자 수정 1건("Renalla"→"Rennala")뿐 — 같은 출처(직접 대조)
- wiki.gg의 1.00 문서도 관련 명칭 변경만 기록: "Rennala, Full Moon Witch"→"Rennala, Queen of the Full Moon", "The Worshipful Gold Mask"→"The Noble Goldmask", "Champion's Redwolf"→"Red Wolf of the Champion" — [eldenring.wiki.gg Version 1.00](https://eldenring.wiki.gg/wiki/Game_Version/1.00)

### Inferences
- 1.00 일본어 텍스트까지 달랐던 항목(Arbor Sentinels, 휘석의 크리스, 聖律の戒め)은 개발 후반에 실제로 설정이 바뀐 것으로 볼 수 있고, 영어만 다른 항목(Tenebrae 지도, Radagon's Chimera)은 그보다 더 이른 초안의 영어 번역이 갱신되지 않고 남은 것으로 보인다(추론).
- "Radagon's warning … the Tarnished led into war will cross the Sea of Fog and return"은 초기 설정에서 라다곤이 '빛바랜 자의 귀환'을 경고한 인물로 구상됐을 가능성을 시사하나, 정식 설정으로 쓸 수 없다(추론·비정식).
- 'ラダゴンとレナラの婚姻を祝した宝剣'이 '로데일과의 화친'으로 바뀐 것은, 정식판이 혼인을 개인사보다 국가 간 화친으로 표현하는 쪽으로 정리했음을 보여 준다(추론).

### Gaps
- 최종 보스 모델 구조(마리카 모델과 라다곤 모델의 관계, 왼팔), Zullie the Witch·Sekiro Dubi의 관련 영상: 조사 중.
- 네트워크 테스트(2021-11) 텍스트와의 차이: 조사 중.
