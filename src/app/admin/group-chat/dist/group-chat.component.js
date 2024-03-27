"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupChatComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Role_1 = require("src/app/_models/Role");
var GroupChatComponent = /** @class */ (function () {
    function GroupChatComponent(groupChatService) {
        this.groupChatService = groupChatService;
        this.GPCHAT = [];
        this.HRGPCHAT = [];
        this.PMGPCHAT = [];
        this.CRMGPCHAT = [];
        this.EmployeeGPCHAT = [];
        this.ManagerGPCHAT = [];
        this.ConsultGPCHAT = [];
        this.roleOptions = Object.values(Role_1.RoleName);
        this.usersOptions = [];
        this.groupChatForm = new forms_1.FormGroup({
            groupTitle: new forms_1.FormControl(''),
            rules: new forms_1.FormControl(''),
            role: new forms_1.FormControl(Role_1.RoleName.ROLE_USER),
            users: new forms_1.FormControl([])
        });
    }
    GroupChatComponent.prototype.ngOnInit = function () {
        this.loadGPCHAT();
        this.loadAvailableUsers();
    };
    GroupChatComponent.prototype.loadAvailableUsers = function () {
        var _this = this;
        this.groupChatService.getAvailableUsers().subscribe(function (data) {
            _this.usersOptions = data;
            console.log(data);
        }, function (error) {
            console.error('An error occurred while loading available users:', error);
        });
    };
    GroupChatComponent.prototype.loadGPCHAT = function () {
        var _this = this;
        this.groupChatService.getAllGroupChats().subscribe(function (data) {
            _this.GPCHAT = data;
            _this.HRGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'HR'; });
            _this.PMGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'PM'; });
            _this.CRMGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'CRM'; });
            _this.ManagerGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'Manager'; });
            _this.ConsultGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'Consult'; });
            _this.EmployeeGPCHAT = _this.GPCHAT.filter(function (chat) { return chat.groupTitle === 'Employee'; });
        });
    };
    GroupChatComponent.prototype.refreshData = function () {
        this.loadGPCHAT();
    };
    GroupChatComponent.prototype.saveGroupChat = function () {
        var _this = this;
        var _a, _b, _c;
        if (this.groupChatForm.valid) {
            var newGroupChat = {
                groupTitle: (_a = this.groupChatForm.get('groupTitle')) === null || _a === void 0 ? void 0 : _a.value,
                rules: (_b = this.groupChatForm.get('rules')) === null || _b === void 0 ? void 0 : _b.value,
                role: {
                    RoleName: (_c = this.groupChatForm.get('role')) === null || _c === void 0 ? void 0 : _c.value
                }
            };
            this.groupChatService.createGroupChat(newGroupChat).subscribe(function () {
                console.log('Group chat saved successfully');
                _this.loadGPCHAT(); // Refresh data after saving
            }, function (error) {
                console.error('An error occurred while saving group chat:', error);
            });
        }
    };
    GroupChatComponent = __decorate([
        core_1.Component({
            selector: 'app-group-chat',
            templateUrl: './group-chat.component.html',
            styleUrls: ['./group-chat.component.css']
        })
    ], GroupChatComponent);
    return GroupChatComponent;
}());
exports.GroupChatComponent = GroupChatComponent;
