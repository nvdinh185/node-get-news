import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { ApiAuthService } from '../../services/apiAuthService';
import { ApiContactService } from '../../services/apiContactService';

@Component({
  selector: 'page-home-news',
  templateUrl: 'home-news.html'
})
export class HomeNewsPage {

  server = "http://localhost:9239/site-manager/news"
  userInfo: any;
  contacts = {}

  constructor(private events: Events
    , private auth: ApiAuthService
    , private apiContact: ApiContactService
  ) { }

  ngOnInit() {
    this.refreshNews();
    this.events.subscribe('event-main-login-checked'
      , (data) => {
        console.log("789", data)
        this.userInfo = "766777123"
        //console.log(!this.userInfo)
        this.contacts = this.apiContact.getUniqueContacts();
        Object.defineProperty(this.contacts, data, {
          value: {},
          writable: true, enumerable: true, configurable: true
        });

        this.getHomeNews();
      })
  }

  dynamicCards = {
    title: "Đây là trang tin của Định"
    , buttons: [
      { color: "primary", icon: "photos", next: "ADD" }
    ]
    , items: [
      {
        short_detail: {
          avatar: "assets/imgs/ca_nau.jpg"
          , h1: "Nguyễn Văn Định"
          , p: "Đây là thông tin mô tả về nội dung này"
          , note: 1556935776334
          , action: { color: "primary", icon: "more", next: "MORE" }
        }
        , medias: [
          {
            image: "assets/imgs/anh_vua2.png"
          }
          , {
            image: "assets/imgs/anh_vua.png"
          }
        ]
        , results: {
          likes: {
            like: ["like"]
            , love: ["love"]
            , sad: ["sad"]
          }
          , comments: [
            {
              name: "cuong.dq"
              , comment: "day la cai gi vay"
              , time: new Date().getTime()
            }
            ,
            {
              name: "cu.dq"
              , comment: "la cai nay do nhe"
              , time: new Date().getTime()
            }
          ]
          , shares: [
            {
              name: "cuong.dq"
              , comment: "day la cai gi vay"
              , time: new Date().getTime()
            }
            ,
            {
              name: "cu.dq"
              , comment: "la cai nay do nhe"
              , time: new Date().getTime()
            }
          ]

        }
        , actions: {
          like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" }
          , comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" }
          , share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
        }
      }
    ]
  }

  async refreshNews() {
    console.log("1")
    //chay ham nay de KHOI TAO CAC USER PUBLIC
    await this.apiContact.getPublicUsers(true);
    console.log("2")
    //lay cac danh ba public
    this.contacts = this.apiContact.getUniqueContacts();
    //neu chua dang nhap thi lay cac tin cua user public
    if (!this.userInfo) this.getHomeNews();
    console.log("4")
  }

  getHomeNews() {
    console.log("456", this.contacts)
    this.getJsonPostNews()
      .then(data => {
        data.forEach(el => {
          this.dynamicCards.items.push(el);
        })
      })
      .catch(err => console.log(err))
  }

  getJsonPostNews() {
    let linkFile = this.server + "/get-file/"
    let offset = 0;
    let limit = 2;
    let follows = [];
    for (let key in this.contacts) {
      follows.push(key);
    }

    let json_data = {
      limit: limit,
      offset: offset,
      follows: follows
    }
    return this.auth.postDynamicForm(this.server + "/get-news", json_data, true)
      .then(data => {
        console.log(data)
        let items = [];
        data.forEach(el => {
          let medias = [];
          if (el.medias) {
            el.medias.forEach(e => {
              e.image = linkFile + e.url;
              medias.push(e);
            })
          }
          el.medias = medias;
          el.actions = {
            like: { name: "LIKE", color: "primary", icon: "thumbs-up", next: "LIKE" }
            , comment: { name: "COMMENT", color: "primary", icon: "chatbubbles", next: "COMMENT" }
            , share: { name: "SHARE", color: "primary", icon: "share-alt", next: "SHARE" }
          }
          el.short_detail = {
            avatar: "assets/imgs/ca_nau.jpg"
            , h1: "Nguyen Van Dinh"
            , p: el.content
            , note: el.time
            , action: { color: "primary", icon: "more", next: "MORE" }
          }
          el.results = {
            likes: {
              like: ["like"]
              , love: ["love"]
              , sad: ["sad"]
            }
            , comments: [
              {
                name: "cuong.dq"
                , comment: "day la cai gi vay"
                , time: new Date().getTime()
              }
              ,
              {
                name: "cu.dq"
                , comment: "la cai nay do nhe"
                , time: new Date().getTime()
              }
            ]
            , shares: [
              {
                name: "cuong.dq"
                , comment: "day la cai gi vay"
                , time: new Date().getTime()
              }
              ,
              {
                name: "cu.dq"
                , comment: "la cai nay do nhe"
                , time: new Date().getTime()
              }
            ]
          }
          items.push(el);
        });
        return items;
      })
      .catch(err => { return [] })
  }
}