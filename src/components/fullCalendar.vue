<template>
    <div class="content">
        <el-row :gutter="20" class="elRow">
            <el-col :span="5" class="elColLeft">
                <div class="grid-content bg-purple">
                    <FullCalendarSeach></FullCalendarSeach>
                </div>
            </el-col>
            <el-col :span="14" class="elColMiddle">
                <div class="grid-content-middle">
                    <div class="grid-content-header">
                        <div class="headerLeft">
                            我的日程
                            <div class="type">
                                <div style="background:#61B1FF"></div>
                                <span>个人</span>
                            </div>
                            <div class="type">
                                <div style="background:#E880D8"></div>
                                <span>工作</span>
                            </div>
                            <div class="type">
                                <div style="background:#F71701"></div>
                                <span>生日</span>
                            </div>
                        </div>
                        <el-button type="primary" round size="mini" @click="addDayModal = true">新增日程</el-button>
                    </div>
                    <div class="fullCalendar">
                        <FullCalendar 
                        ref="fullCalendar" 
                        defaultView="dayGridMonth" 
                        locale="zh-cn" :header="{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                        }" 
                        :businessHours="businessHours" 
                        :eventTimeFormat="evnetTime" 
                        :buttonText="buttonText" 
                        :plugins="calendarPlugins" 
                        :weekends="calendarWeekends" 
                        :events="getCalendarEvents" 
                        :eventLimit="true" 
                        eventLimitText="更多" 
                        @dateClick="handleDateClick" 
                        @eventClick="handleEventClick"
                        @dayClick="handleDayClick" />
                    </div>
                </div>
            </el-col>
            <el-col :span="5" class="elColright">
                <div class="grid-content bg-purple">
                    <DadyFullCalendar :dayEvents="dayEvents" :dayDate="dayDate"></DadyFullCalendar>
                </div>
            </el-col>
        </el-row>
        <!-- 新增日弹框 -->
        <newDay :visible.sync="addDayModal" @submit="submit"></newDay>
    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendarSeach from "./FullCalendarSeach.vue";
import DadyFullCalendar from "./DadyFullCalendar.vue";
import newDay from "./newDay.vue";

export default {
    name: "fullcalendar",
    components: {
        FullCalendar,
        FullCalendarSeach,
        DadyFullCalendar,
        newDay
    },
    data() {
        return {
            buttonText: {
                today: "今天",
                month: "月",
                week: "周",
                day: "天",
                list: "列表"
            },
            calendarPlugins: [dayGridPlugin,
                timeGridPlugin,
                interactionPlugin //
            ],
            calendarOptions: {
                plugins: [dayGridPlugin],
                initialView: "dayGridMonth",
                calendarWeekends: true,
                buttonText: {
                    today: "今天",
                    month: "月",
                    week: "周",
                    day: "天",
                    list: "列表" //暂时没有用,没有引进来,对视图没有影响
                }
            },
            calendarWeekends: true,
            evnetTime: {
                //time 格式
                hour: "numeric",
                minute: "2-digit",
                hour12: false
            },
            calendarEvents: [
                // init event list
                {
                    title: "Event Now",
                    start: new Date(),
                    color: "#61B1FF",
                    allDay: false
                },
                {
                    title: "Event Now2",
                    start: new Date(),
                    color: "#E880D8",
                    allDay: true
                }
            ],
            businessHours: {
                //强调日历中的某些时间段，比如默认情况下，工作日周一-周五上午9点-下午5点。
                daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday工作日

                startTime: "10:00", // a start time (10am in this example)
                endTime: "18:00" // an end time (6pm in this example)
            },
            calendarApi: null, //日程api
            // 新增日程弹窗
            addDayModal: false,
            dayEvents:[],
            dayDate:new Date().format('yyyy-MM-dd')
        };
    },
    methods: {
        //触发月份
        getCalendarEvents(info, successCallback) {
            console.log(info, 1); //上月份的最后一天的信息
            const events = [
                ...this.calendarEvents
                // {
                //   title: info.startStr,
                //   start: info.start.valueOf(),
                //   allDay: false
                // }
            ];
            successCallback(events); //返回数据显示在日程表上
        },
        toggleWeekends() {
            this.calendarWeekends = !this.calendarWeekends; // update a property
        },
        gotoPast() {
            this.calendarApi.gotoDate("2019-08-01"); // call a method on the Calendar object
        },
        handleDateClick(arg) {
            console.log("点击日程表的莫一天", arg);
            let eventsArry=[...this.calendarEvents]
            let dayEvents= eventsArry.filter(event=>{
                console.log(event)
                let eventStart = event.start.format('yyyy-MM-dd')
                let eventEnd = event.end ? event.end.format('yyyy-MM-dd') : null
                let theDate = arg.date.format('yyyy-MM-dd')
                console.log(eventStart,eventEnd,theDate)
                return (eventStart <= theDate && (eventEnd >= theDate) && !(eventStart < theDate && (eventEnd == theDate))) || (eventStart == theDate && (eventEnd === null))    
            })
            console.log(dayEvents)
            this.dayDate=arg.date.format('yyyy-MM-dd')
            this.dayEvents=dayEvents
            // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
            //     // this.calendarEvents.push({ // add new event data
            //     //   title: 'New Event',
            //     //   start: arg.dateStr,
            //     //   allDay: true
            //     // })
            // }
            //this.calendarApi.refetchEvents();

        },
        handleEventClick(info) {
            // 点击的日期的某个enevt
            console.log('info',info);
            alert("Event: " + info.event.title);
        },
        handleDayClick(obj){
            console.log('events',obj)
        },
        submit(val) {
            console.log("form 的值", val);
            if (val) {  
                let start=null
                let end = null
                if(val.value){
                    start = val.startDateTime
                    end = val.endDateTime
                }else{ 
                    start = new Date(val.startDate)
                    end = new Date(val.endDate)
                }
                this.calendarEvents.push({
                    // add new event data
                    title: val.name,
                    start: start,
                    end: end,
                    className:val.value?'dayTime':'',
                    color: val.colorType
                });
            }
            this.calendarApi.refetchEvents();
        }
    },
    mounted() {
        this.calendarApi = this.$refs.fullCalendar.getApi();
    }
};
</script>

<style lang="less" scoped>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
.content {
    height: 100%;
    width: 100%;

    .elRow {
        height: 100%;
        width: 100%;

        .elColLeft {
            height: 100%;
            background-color: #fff;
            padding-left: 0px !important;
            padding-right: 0px !important;
            .bg-purple {
                height: 100%;
            }
        }
        .elColMiddle {
            height: 100%;
            .grid-content-middle {
                height: 100%;
                background-color: #fff;
                .grid-content-header {
                    margin-bottom: 5px;
                    border-bottom: 1px solid #e4e7ed;
                    padding: 10px;
                    font-size: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .headerLeft {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .type {
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            div {
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
        }

        .elColright {
            height: 100%;
            background: #fff;
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
    }
}
</style>
<style lang="less">
.fullCalendar {
    .fc-toolbar .fit {
        h2 {
            font-size: 1.3em;
        }
        &.fc-header-toolbar {
            margin-bottom: 0.5em;
        }
        .fc-button {
            padding: 0.2em 0.4em;
        }
    }
}
</style>
