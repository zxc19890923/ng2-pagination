1、安装插件

npm install ng2-pagination --save
2、如果使用System.js打包那么就需要配置systemjs.config.js文件

A. map中加入以下代码

'ng2-pagination': 'npm:ng2-pagination'
B. packages中添加以下代码

"ng2-pagination": {
     main: 'index.js',
     defaultExtension: 'js'
}
3、app.module.ts主模块中添加此模块，并添加到imports

import {Ng2PaginationModule} from "ng2-pagination"

@NgModule({
    imports: [
        Ng2PaginationModule
    ],
4、创建file.component.ts文件，提供数据

import {Component} from "@angular/core";
@Component({
    selector: "my-page",
    templateUrl: "./app/page.html"
})
export class PageComponent {
    info: Array<Object>; //对象数组
    constructor() {
        this.info = [
            {
                "id": 1,
                "name": "html"
            },
            {
                "id": 2,
                "name": "css"
            },
            {
                "id": 3,
                "name": "jquey"
            },
            {
                "id": 4,
                "name": "angular"
            },
            {
                "id": 5,
                "name": "ionic"
            },
            {
                "id": 6,
                "name": "angular2"
            },
            {
                "id": 7,
                "name": "ionic2"
            },
            {
                "id": 8,
                "name": "react"
            },
            {
                "id": 9,
                "name": "node"
            },
            {
                "id": 10,
                "name": "webpack"
            },
            {
                "id": 11,
                "name": "typescript"
            }
        ]
    }
}
5、创建模板page.html界面

<ul>
    <li *ngFor="let item of info | paginate: { itemsPerPage: 10, currentPage: p }">{{item.name}}</li>
</ul>
<pagination-controls (pageChange)="p = $event"></pagination-controls>
6、提高篇，分页的数据一般都是有父组件提供的，所以数据应该由属性传递给@Input然后获取他的值。 部分代码

父组件 .ts文件 提供数据

export class FatherComponent {
    result: Array<Object>;
    constructor() {
        this.result = [
            {
                "id": 1,
                "name": "html"
            },
            {
                "id": 2,
                "name": "css"
            },
            {
                "id": 3,
                "name: "js"
            }
        ]
    }
}
父组件 .html文件

<!-- 把父组件的信息传递给分页组件, 进行分页。 -->
<my-page [info]="result"></my-page>
分页组件 .ts文件 使用Input模块获取属性传递过来的数据 info

import {Component, Input} from "@angular/core";
@Component({
    selector: "my-page",
    templateUrl: "./app/page.html"
})
export class PageComponent {
    // 使用@Input接受传递过来的变量,操作。
    @Input()
    info: Array<Object>;
}
分页模板代码不变，通过info获取数据

<ul>
    <li *ngFor="let item of info | paginate: { itemsPerPage: 10, currentPage: p }">{{item.name}}</li>
</ul>
<pagination-controls (pageChange)="p = $event"></pagination-controls>
7、最后修改分页英文字母为中文的文件node_modules/ng2-pagination/dist/template.js 修改上一页、下一页
