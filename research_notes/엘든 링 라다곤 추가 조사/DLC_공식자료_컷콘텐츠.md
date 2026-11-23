# 라다곤 추가 조사 — DLC 텍스트 · 게임 외부 공식 자료 · 컷 콘텐츠/데이터마인 · 제작 배경

> 상태: **중간 저장본(조사 진행 중)** — 2026-11-23 작성. 아래 항목은 지금까지 실제 페이지/데이터에서 확인한 것만 적었다. 미완 항목은 각 절의 Gaps에 "조사 중"으로 표기.
> 근거 수준: [확정]=게임 내 텍스트/공식 발언, [유력]=다수 합의, [이론]=추측. 데이터마인·컷 콘텐츠는 **정식 설정 아님**을 별도 표기.
> DLC 원문 출처: DLC 텍스트 덤프 "The Impaler's Archive"(ividyon, 2024-06-24 최종 푸시, DLC 출시 버전 기준 FMG 추출본). EN: https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html / JP: https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html (저장소: https://github.com/ividyon/Impalers-Archive). 이 덤프에는 한국어가 없어 한국어 원문은 별도 확인 필요(조사 중).

## 1. DLC에서 라다곤의 이름이 직접 등장하는 텍스트가 있는가

### Takeaway
DLC 텍스트 파일 전체(영/일)에서 "Radagon/ラダゴン"은 **단 1회**만 나오며, 그것도 아이템 텍스트가 아니라 라단의 대사 데이터(TalkMsg_dlc01, ID 21040100)다. 이 대사는 게임에서 재생되지 않는 미사용(컷) 대사로 보도되었으므로(확인 진행 중), "플레이어가 실제로 보는 DLC 텍스트 기준 직접 언급 0건, 데이터상 미사용 대사 1건"이 정확한 표현이다.

### Cited Findings
- DLC 영어 텍스트 덤프 전체에서 "Radagon" 검색 결과 1건: `[21040000] I am Radahn.` / `[21040100] Born of red-maned Radagon, and Rennala of the Full Moon.` / `[21040200] A lion bred for battle.` (TalkMsg_dlc01.fmg, 대화 그룹 0210, Section 40) — [Impaler's Archive EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- DLC 일본어 텍스트 덤프 전체에서 "ラダゴン" 검색 결과 1건(동일 ID): `[21040000] …我は、ラダーン` / `[21040100] 赤髪のラダゴンと、満月のレナラの子` / `[21040200] …獅子の、戦士だ` — [Impaler's Archive JP](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html)
- DLC 아이템명·아이템 설명(Accessory/Goods/Weapon/Protector/Gem/Magic 계열 FMG) 안에는 "Radagon/ラダゴン" 0건 — 위 덤프 전수 검색 결과(같은 출처).
- "Melina" 역시 DLC 영어 텍스트 덤프 전체에서 0건 — [Impaler's Archive EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)

### Inferences
- 기존 보고서 §7의 "라다곤의 기원은 끝내 밝히지 않았다"는 서술은 텍스트 전수 검색으로 뒷받침된다(DLC는 아이템 텍스트에서 라다곤을 한 번도 호명하지 않는다).

### Gaps
- 위 라단 대사가 실제 게임에서 미사용인지에 대한 보도(PC Gamer 등) 원문 확인: 조사 중.
- 한국어판 해당 문자열: 미확인(덤프에 한국어 없음).

## 2. DLC에서 라다곤 해석에 간접적으로 쓰이는 텍스트의 정확한 원문

### Takeaway
(조사 중) 지금까지 확인한 원문만 우선 기록한다. 핵심 정정: 기존 보고서가 인용한 *"the flesh of a shaman blends well with the flesh of others"* 는 실제 게임 문장이 아니며, 실제 문장은 무기 **Tooth Whip(歯の鞭)** 설명의 *"The flesh of shamans was said to meld harmoniously with others."* 이다.

### Cited Findings
- **Tooth Whip / 歯の鞭** [무기 ID 20500000] EN: "Whip bestrewn with rotting, misshapen teeth. Filthy and seething with disease, the teeth are embedded in the whip and dose the victim with deadly poison upon each strike. / As the wounds ripen they grow inflamed and ooze pus. The flesh of shamans was said to meld harmoniously with others." JP: 「醜い歯を不揃いに並べ、埋め込んだ鞭／汚れた歯は、あらゆる雑菌に塗れており／その歯傷には猛毒が蓄積する／やがて、傷はじゅくじゅくと膿み爛れ／巫子たちは、他の肉とよく馴染んだという」 — [EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html) / [JP](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/MasterJP.html)
- **Golden Braid / 黄金の編み髪** [탈리스만 ID 7120] EN: "A braid of golden hair, cut loose. / Queen Marika's offering to the Grandmother. / Boosts holy damage negation by the utmost. / What was her prayer? Her wish, her confession? / There is no one left to answer, and Marika never returned home again." JP: 「切り落とされた黄金の編み髪／女王マリカの、大母への供物／聖カット率を、最も大きく高める／彼女が何を祈り、願い、告解したのか／知る者は誰もいない。ただその後に／マリカが故郷に戻ることはなかった」 — 같은 출처
- **Minor Erdtree / 小黄金樹** [기도 ID 2006670] EN: "Secret incantation of Queen Marika. / Only the kindness of gold, without Order. / Creates a small, illusory Erdtree that continuously restores the HP of nearby allies. / Marika bathed the village of her home in gold, knowing full well that there was no one to heal." JP: 「女王マリカの秘めたる祈祷／優しいだけの、律無き黄金／小さな黄金樹の幻影を生じ／周囲の味方のＨＰを持続的に回復する／マリカは故郷の村を黄金で包んだ／癒すべき何者も、いないと知っていても」 — 같은 출처
- **Secret Rite Scroll / 秘儀の巻物** [ID 2008014] EN: "A scroll made of white tree bark. / Few can decipher the scroll, which describes the secret rite of the divine gateway said to be found at the tower enshrouded by shadow. / "A lord will usher in a god's return, and the lord's soul will require a vessel."" JP: 「白い樹皮の巻物／影に隠された塔にあるという／神の門の秘儀が記されている／だが、読み解けるのは、ごく一部だ／神の帰還は王により導かれ／王の魂には、依り代が求められる」 — 같은 출처
- **Blessing of Marika / マリカの祝福** [ID 2000900] EN: "…Marika once created several of these physicks for Messmer's sake. But never again." JP: 「彼女は、メスメルのために、この霊薬を幾つか作った／その後、二度とそうすることはなかった」 — 같은 출처
- **Rellana's Helm** [ID 5260000] EN: "Rennala, head of the royal family of Caria, was said to have given her younger sister, who renounced her lineage to chase after Messmer, a gift of lustrous black hair." — [EN](https://raw.githubusercontent.com/ividyon/Impalers-Archive/main/Master.html)
- **Young Lion's Helm** [ID 5270000] EN: "The golden helm worn by Radahn in his younger years. Proudly displaying his heroic red hair, it is fitting attire for a lion. / When Malenia, Blade of Miquella, let the rotflower blossom in Aeonia, Radahn heard a murmur in his ear— "Miquella awaits thee, O promised consort."" — 같은 출처
- **Remembrance of a God and a Lord** [ID 2002907] EN: "In their childhood, Miquella saw in Radahn a lord. His strength, and his kindness, that stood in stark contrast with their afflicted selves. And so Miquella made his heartfelt wish. That Radahn would one day be his king consort." — 같은 출처
- **Multilayered Ring of Light** [ID 2006710] EN: "This light-ring incantation was cultivated by a tradition separate from Golden Order fundamentalism." (DLC 전체에서 "fundamentalism" 유일 등장) — 같은 출처
- 지옥(gaol) NPC 대사 [1500200010~40] EN: "For pity's sake, your place is in the jar. / Nigh-sainthood itself awaits you within. / For shamans like you, this is your lot. / Life were you accorded for this alone." JP: 「…さあ、大人しく壺に入りなさい／そして、善き人になりなさい／お前たちは、巫子なのだから／そのために、生まれてきたのだから」 — 같은 출처

### Inferences
- (조사 중)

### Gaps
- 메스메르·렐라나·미켈라 관련 나머지 원문, 한국어 원문: 조사 중.

## 3~8. (조사 중)

### 지금까지 확인된 사항(임시)
- GRRM 이니셜 설: 팬들이 Godfrey·Rennala·Radagon·Marika의 머리글자가 GRRM이라고 지적 → 마틴은 2022년 3월 Not A Blog 글에서 부인("This was news to me" 등) — 2차 보도: [PC Gamer](https://www.pcgamer.com/george-rr-martin-didnt-hide-his-initials-in-elden-ring-on-purpose-apparently), [GamesRadar](https://www.gamesradar.com/elden-rings-demigods-arent-named-after-george-rr-martin-after-all). 원문 블로그 확인 조사 중.
- 실사 영화: A24·알렉스 갈런드, 2028-03-03 극장 개봉 예정(미개봉), 2026년 4월 캐스트·개봉일 발표 — [Engadget](https://engadget.com/entertainment/tv-movies/the-elden-ring-movie-hits-theaters-on-march-3-2028-154411670.html), [GamesRadar](https://www.gamesradar.com/entertainment/fantasy-movies/elden-ring-movie-sets-2028-release-date-full-cast-and-confirms-it-will-be-filmed-for-imax/). 배역(라다곤 등장 여부) 미공개 — 조사 중.
