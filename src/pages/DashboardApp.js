import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

// @mui
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
// sections


import { getTarget } from '../utils/apiCalls'

// ----------------------------------------------------------------------

export default function DashboardApp(...props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [target, setTarget] = useState("");

  // TODO: get trarget from my-target endpoint 

    // grads level image
    const grads = [
        {
            id: 1,
            grad: "<div class=item style=height:20px;margin-top:250px;></div>",
            gradClass: "<div class=item_white style=height:20px;margin-top:250px;></div>",
            gradClassCircle: "<div class=item_white style=height:20px;margin-top:250px;>" + "<div class='icon_crowns'>" + "<img src='./static/icons/crowns/1.svg'/></div></div>",
        },
        {
            id: 2,
            grad: "<div class=item style=height:40px;margin-top:230px;></div>",
            gradClass: "<div class=item_white style=height:40px;margin-top:230px;></div>",
            gradClassCircle: "<div class=item_white style=height:40px;margin-top:230px;><div class='icon_crowns'><img src='./static/icons/crowns/2.svg'/></div></div>",
        },
        {
            id: 3,
            grad: "<div class=item style=height:60px;margin-top:210px;></div>",
            gradClass: "<div class=item_white style=height:60px;margin-top:210px;></div>",
            gradClassCircle: "<div class=item_white style=height:60px;margin-top:210px;><div class='icon_crowns'><img src='./static/icons/crowns/3.svg'/></div></div>",
        },
        {
            id: 4,
            grad: "<div class=item style=height:80px;margin-top:190px;></div>",
            gradClass: "<div class=item_white style=height:80px;margin-top:190px;></div>",
            gradClassCircle: "<div class=item_white style=height:80px;margin-top:160px;><div class='icon_crowns'><img src='./static/icons/crowns/4.svg'/></div></div>",
        },
        {
            id: 5,
            grad: "<div class=item style=height:100px;margin-top:170px;></div>",
            gradClass: "<div class=item_white style=height:100px;margin-top:170px;></div>",
            gradClassCircle: "<div class=item_white style=height:100px;margin-top:140px;><div class='icon_crowns'><img src='`./static/icons/crowns/5.svg`'/></div></div>",
        },
        {
            id: 6,
            grad: "<div class=item style=height:120px;margin-top:150px;></div>",
            gradClass: "<div class=item_white style=height:120px;margin-top:150px;></div>",
            gradClassCircle: "<div class=item_white style=height:120px;margin-top:120px;><div class='icon_crowns'><img src='`./static/icons/crowns/6.svg`'/></div></div>",
        },
        {
            id: 7,
            grad: "<div class=item style=height:140px;margin-top:130px;></div>",
            gradClass: "<div class=item_white style=height:140px;margin-top:130px;></div>",
            gradClassCircle: "<div class=item_white style=height:140px;margin-top:100px;><div class='icon_crowns'><img src='`./static/icons/crowns/7.svg`'/></div></div>",
        },
        {
            id: 8,
            grad: "<div class=item style=height:160px;margin-top:110px;></div>",
            gradClass: "<div class=item_white style=height:160px;margin-top:110px;></div>",
            gradClassCircle: "<div class=item_white style=height:160px;margin-top:80px;><div class='icon_crowns'><img src='`./static/icons/crowns/8.svg`'/></div></div>",
        },
        {
            id: 9,
            grad: "<div class=item style=height:180px;margin-top:90px;></div>",
            gradClass: "<div class=item_white style=height:180px;margin-top:90px;></div>",
            gradClassCircle: "<div class=item_white style=height:180px;margin-top:60px;><div class='icon_crowns'><img src='`./static/icons/crowns/9.svg`'/></div></div>",
        },
        {
            id: 10,
            grad: "<div class=item style=height:200px;margin-top:70px;></div>",
            gradClass: "<div class=item_white style=height:200px;margin-top:70px;></div>",
            gradClassCircle: "<div class=item_white style=height:200px;margin-top:40px;><div class='icon_crowns'><img src='`./static/icons/crowns/10.svg`'/></div></div>",
        },
        {
            id: 11,
            grad: "<div class=item style=height:220px;margin-top:50px;></div>",
            gradClass: "<div class=item_white style=height:220px;margin-top:50px;></div>",
            gradClassCircle: "<div class=item_white style=height:220px;margin-top:20px;><div class='icon_crowns'><img src='`./static/icons/crowns/11.svg`'/></div></div>",
        }
    ];


    let targetId = `${target._id}`;

    const [gradBar, setGradBar] = useState(grads);

    if (target === "") (
    getTarget()
    .then((data) => {
      console.log("target data", data);
      setTarget(data)

    })
    .catch((err_data) => {
      console.log("no data", err_data);
      // TODO: Make allert!
    })
  )

  const [partner] = useOutletContext();

  console.log("props in DashboardApp", partner);


    if (!partner && !target) {
        return (
            <></>
        )
    } else {
        let lo_circle = (`${partner.current_data.current_lo}` * 100) / 25;
        let go_circle = (`${partner.current_data.current_go}` * 100) / 500;
        let ngo_circle = (`${partner.current_data.current_ngo}` * 100) / 1500;
        let olg_circle = (`${partner.current_data.current_olg}` * 100) / 0;
        let country = `${partner.country}`.toString().slice(1);

        if (country === '01') {country = 'Moldova'}if (country === '02') {country = 'Ukraine'}if (country === '03') {country = 'Russia'}if (country === '04') {country = 'Belorussia'}
        if (country === '05') {country = 'Kazakhstan'} if (country === '06') {country = 'Uzbekistan'}if (country === '06') {country = 'Uzbekistan'}if (country === '07') {country = 'Tajikistan'}
        if (country === '08') {country = 'Romania'}if (country === '09') {country = 'Greece'}if (country === '10') {country = 'Spain'}
        if (country === '11') {country = 'Slovenia'}if (country === '12') {country = 'Турция'}if (country === '13') {country = 'Australia'}if (country === '14') {country = 'Italy'}if (country === '15') {country = 'Great Britain'}if (country === '16') {country = 'Kyrgyzstan'}if (country === '17') {country = 'Georgia'}if (country === '18') {country = 'Israel'}if (country === '19') {country = 'Germany'}if (country === '20') {country = 'Nederland'}if (country === '21') {country = 'Ireland'}if (country === '22') {country = 'England'}if (country === '23') {country = 'France'}if (country === '24') {country = 'Portugal'}if (country === '25') {country = 'Czechia'}if (country === '26') {country = 'Austria'}if (country === '27') {country = 'Poland'}if (country === '28') {country = 'Switzerland'}

        // let w =moment(this.state.dateselected, "MM-YYYY")
        const [month, year] = `${partner.closed_data[partner.closed_data.length-1].closed_month}`.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);

        return (
            <div>
                <Page title="Dashboard">
                    <Container maxWidth="xl">
                        <div className={"graph_vertical"}>
                            <div className={'graphW'}>
                                <div className={'row'}>
                                    <div className={'col-1'}>&nbsp;</div>
                                    {gradBar.map((item) =>
                                        (item.id < targetId) && <div key={item.id} className={'col-1'}
                                                                   dangerouslySetInnerHTML={{__html: item.gradClass}}/> ||
                                        (item.id == targetId) &&
                                        <div key={item.id} className={'col-1'}
                                             dangerouslySetInnerHTML={{__html: item.gradClassCircle}}/> ||
                                        (item.id > targetId) &&
                                        <div key={item.id} className={'col-1'}
                                             dangerouslySetInnerHTML={{__html: item.grad}}/>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        {/*row: icon, name,  diagrams*/}
                        <div className={'graphW2'}>
                            <div className={'row mobile_circle'}>
                                <div className={'col-1'}>
                                    <div className={'big_icon_pos'}>
                                        <div className={'big_icon'}>
                                            <img src={`./static/icons/crowns/${partner.rank_id}.svg`}
                                                 alt={'rank_icon'}/>
                                        </div>
                                    </div>
                                    <div style={{textAlign: "center", fontWeight: '600', color: '#2065d1'}}>
                                        {partner.rank}</div>
                                </div>
                                <div className={'col-3'}>
                                    <div className={'name_style'}>
                                        {partner.last_name}&nbsp;{partner.first_name}</div>
                                    <div style={{textAlign: "center"}}>ЛРН:&nbsp;{partner._id}</div>
                                    <br/>
                                </div>
                                {/*circle diagrams*/}
                                <div className={'col-2'}>
                                    <div className={"single-chart"}>
                                        <svg viewBox="0 0 35 35" className="pie">
                                            <circle className={"chart_total"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`100 100`}/>
                                            <circle className={"chart"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`${lo_circle} 100`}/>
                                        </svg>
                                        {(`${lo_circle}` > 100) &&
                                        <span className="material-symbols-outlined star_lo">stars</span>
                                        }
                                        <div className={'circle_line_absolute'}>
                                            {partner.current_data.current_lo}
                                            <div className={'circle_underline'}>{target.lo}</div>
                                        </div>
                                    </div>

                                    <p>ЛО</p>
                                </div>
                                <div className={'col-2 media_circle'}>
                                    <div className={"single-chart"}>
                                        <svg viewBox="0 0 35 35" className="pie">
                                            <circle className={"chart_total"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`100 100`}/>
                                            <circle className={"chart"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`${go_circle} 100`}/>
                                        </svg>
                                        {(`${go_circle}` > 100) &&
                                        <span className="material-symbols-outlined star_go">stars</span>
                                        }
                                        <div className={'circle_line_absolute2'}>
                                            {partner.current_data.current_go}
                                            <div className={'circle_underline'}>{target.go}</div>
                                        </div>
                                    </div>
                                    <p>ГО</p>
                                </div>

                                <div className={'col-2 media_circle'}>
                                    <div className={"single-chart"}>
                                        <svg viewBox="0 0 35 35" className="pie">
                                            <circle className={"chart_total"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`100 100`}/>
                                            <circle className={"chart"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`${ngo_circle} 100`}/>
                                        </svg>
                                        {(`${ngo_circle}` > 100) &&
                                        <span className="material-symbols-outlined star_ngo">stars</span>
                                        }
                                        <div className={'circle_line_absolute3'}>
                                            {partner.current_data.current_ngo}
                                            <div className={'circle_underline'}>{target.ngo}</div>
                                        </div>
                                    </div>
                                    <p>НГО</p>
                                </div>

                                <div className={'col-2 media_circle'}>
                                    <div className={"single-chart"}>
                                        <svg className="pie" viewBox="0 0 35 35">
                                            <circle className={"chart_total"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`100 100`}/>
                                            <circle className={"chart"} r="45%" cx="50%" cy="50%"
                                                    strokeDasharray={`${olg_circle} 100`}/>
                                        </svg>
                                        {(`${olg_circle}` > 100) &&
                                        <span className="material-symbols-outlined star_olg">stars</span>
                                        }
                                        <div className={'circle_line_absolute4'}>
                                            {partner.current_data.current_olg}
                                            <div className={'circle_underline'}>{target.olg}</div>
                                        </div>
                                    </div>
                                    <p>ОЛГ</p>
                                </div>
                            </div>
                        </div>
                        {/*circle diagrams end*/}
                        <div>
                            <div className={'title_black'}>ЗАКРЫТЫЙ МЕСЯЦ</div>
                            {/*<div className={'title_small'}> {months[a]}&nbsp;{b}</div>*/}
                            <div className={'month_align'}>{date.toLocaleString('RU', {month: 'long', year: 'numeric'})}</div>
                            <br/>
                            <div className={'row'}>
                                <div className={'col-1 mt_10 mb_10'} style={{textAlign: "left", paddingTop: '10px'}}>
                                    <div className={"material-symbols-outlined bonus_icon"}>monetization_on</div>
                                    &nbsp; &nbsp;Бонусы
                                </div>
                            </div>
                            <div className={"line_container"}>
                                <div className={"row row_bg container"}>
                                    <div className={"col-12 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].added_bonus}</div>
                                        <div className={'title_small'}>Начисленный бонус</div>
                                    </div>
                                </div>
                                {/*<div className={"row row_bg container"}>*/}
                                {/*    <div className={"col-6 col_bd mt_10 mb_10"}>*/}
                                {/*        <div className={'title'}>{partner.closed_data[0].auto_bonus}No data</div>*/}
                                {/*        <div className={'title_small'}>Авто бонус</div>*/}
                                {/*    </div>*/}
                                {/*    <div className={"col-6 col_bd mt_10 mb_10"}>*/}
                                {/*        <div className={'title'}>{partner.closed_data[0].added_bonus}</div>*/}
                                {/*        <div className={'title_small'}>Начисленный бонус</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className={'row'}>
                                <div className={'col-1 mt_10 mb_10'} style={{textAlign: "left", paddingTop: '10px'}}>
                                    <div className={"material-symbols-outlined bonus_icon"}>leaderboard</div>
                                    &nbsp; &nbsp;Объемы
                                </div>
                            </div>
                            <div className={"line_container"}>
                                <div className={"row row_bg container"}>
                                    <div className={"col-3 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].closed_lo}</div>
                                        <div className={'title_small'}>Ло</div>
                                    </div>
                                    <div className={"col-3 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].closed_go}</div>
                                        <div className={'title_small'}>Го</div>
                                    </div>
                                    <div className={"col-3 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].closed_ngo}</div>
                                        <div className={'title_small'}>Нго</div>
                                    </div>
                                    <div className={"col-3 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].closed_olg}</div>
                                        <div className={'title_small'}>Олг</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-2 mt_10 mb_10'} style={{textAlign: "left", paddingTop: '10px'}}>
                                    <div className={"material-symbols-outlined bonus_icon"}>monetization_on</div>
                                    &nbsp;&nbsp;Квалификация
                                </div>
                                {/*<div className={'col-1 mt_10 mb_10'}>*/}
                                {/*    <div className={'row'}>*/}
                                {/*        <div className={'col-1'}>*/}
                                {/*        <div className={"material-symbols-outlined bonus_icon"}>radio_button_checked</div>*/}
                                {/*        </div>*/}
                                {/*        <div className={'col-10'} >*/}
                                {/*            Квалификация*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                            </div>
                            <div className={"line_container"}>
                                <div className={"row row_bg container"}>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{country}</div>
                                        <div className={'title_small'}>Страна</div>
                                    </div>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].pr2}</div>
                                        <div className={'title_small'}>Лучший продавец</div>
                                    </div>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].pr3}</div>
                                        <div className={'title_small'}>Лидер Рекрутинга</div>
                                    </div>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].pr4}</div>
                                        <div className={'title_small'}>Indigo Holiday</div>
                                    </div>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].pr5}</div>
                                        <div className={'title_small'}>Indigo best</div>
                                    </div>
                                    <div className={"col-2 col_bd mt_10 mb_10"}>
                                        <div className={'title'}>{partner.closed_data[0].pr6}</div>
                                        <div className={'title_small'}>Стабильность</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                               <div className={'col-1 mt_10 mb_10'} style={{textAlign: "left"}}>
                               <div className={"material-symbols-outlined bonus_icon"}>lan</div>
                               &nbsp; &nbsp;Сеть
                            </div>
                            </div>
                            <div className={"line_container"}>
                            <div className={"row row_bg container"}>
                               <div className={"col-4 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].total_distributors}</div>
                                   <div className={'title_small'}>Дистрибьютеров</div>
                               </div>
                               <div className={"col-4 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].active_users_network}</div>
                                   <div className={'title_small'}>ГО/ОЛГ<br/>
                                       Активные дистрибьюторы<br/>
                                       (Л.О. - больше 0 б)
                                   </div>
                               </div>
                               <div className={"col-4 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].qualified_distributors}</div>
                                   <div className={'title_small'}>ГО/ОЛГ<br/>
                                       Квалифицированные дистрибьюторы<br/>(Л.О.- больше или равно 25 б)
                                   </div>
                               </div>
                               <hr className={'hr_dashboard'}/>
                            </div>
                            </div>
                            <div className={"line_container"}>
                            <div className={"row row_bg container"}>
                               <div className={"col-6 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].q_directors_l}</div>
                                   <div className={'title_small'}>Квалифицированных директоров в 1
                                       поколении
                                   </div>
                               </div>
                               <div className={"col-6 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].q_directors_d}</div>
                                   <div className={'title_small'}>Уровень глубины
                                       квалифицированных директоров
                                   </div>
                               </div>
                               <hr className={'hr_dashboard'}/>
                            </div>
                            </div>
                            <div className={"line_container"}>
                            <div className={"row row_bg container"}>
                               <div className={"col-6 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].first_line_beginners}</div>
                                   <div className={'title_small'}>Новичков
                                       подписанных
                                       в первую линию
                                   </div>
                               </div>
                               <div className={"col-6 col_bd mt_10 mb_10"}>
                                   <div className={'title'}>{partner.closed_data[partner.closed_data.length-1].total_beginners}</div>
                                   <div className={'title_small'}>Всего новичков</div>
                               </div>
                               <hr className={'hr_dashboard'}/>
                            </div>
                            </div>
                        </div>
                    </Container>
                </Page>
            </div>
        );
    }
}
