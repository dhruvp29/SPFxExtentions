var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { override } from '@microsoft/decorators';
import { Log, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { BaseApplicationCustomizer, PlaceholderName } from '@microsoft/sp-application-base';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './AppCustomizer.module.scss';
import * as strings from 'HelloWorldApplicationCustomizerStrings';
require('mutationobserver-shim');
var LOG_SOURCE = 'HelloWorldApplicationCustomizer';
var _observer;
/** A Custom Action which can be run during execution of a Client Side Application */
var HelloWorldApplicationCustomizer = /** @class */ (function (_super) {
    __extends(HelloWorldApplicationCustomizer, _super);
    function HelloWorldApplicationCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelloWorldApplicationCustomizer.prototype.onInit = function () {
        Log.info(LOG_SOURCE, "Initialized " + strings.Title);
        console.log("Init Called");
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
        console.log("LCEVENT:onInit=" + window.location.href);
        return Promise.resolve();
    };
    HelloWorldApplicationCustomizer.prototype._renderPlaceHolders = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._loadFooter();
                return [2 /*return*/];
            });
        });
    };
    HelloWorldApplicationCustomizer.prototype._onDispose = function () {
        return Promise.resolve();
    };
    HelloWorldApplicationCustomizer.prototype._loadFooter = function () {
        var queryParms = new UrlQueryParameterCollection(window.location.href);
        var myParm = decodeURIComponent(queryParms.getValue("id"));
        var folderUrl = '';
        if (myParm !== undefined) {
            folderUrl = decodeURIComponent(queryParms.getValue("id"));
            console.log("FolderURL:" + myParm);
        }
        console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");
        console.log("Available placeholders: ", this.context.placeholderProvider.placeholderNames
            .map(function (name) { return PlaceholderName[name]; })
            .join(", "));
        // Handling the bottom placeholder
        //if (!this._bottomPlaceholder) 
        {
            var bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
            // The extension should not assume that the expected placeholder is available.
            if (!bottomPlaceholder) {
                console.error("The expected placeholder (Bottom) was not found.");
                return;
            }
            if (this.properties) {
                var bottomString = "Folders :" + folderUrl;
                if (!bottomString) {
                    bottomString = "(Bottom property was not defined.)";
                }
                if (bottomPlaceholder.domElement) {
                    bottomPlaceholder.domElement.innerHTML = "\n                  <div class=\"" + styles.app + "\">\n                    <div class=\"" + styles.bottom + "\">\n                      <i class=\"ms-Icon ms-Icon--Info\" aria-hidden=\"true\"></i> " + escape(bottomString) + "\n                    </div>\n                  </div>";
                }
            }
        }
    };
    __decorate([
        override
    ], HelloWorldApplicationCustomizer.prototype, "onInit", null);
    return HelloWorldApplicationCustomizer;
}(BaseApplicationCustomizer));
export default HelloWorldApplicationCustomizer;
//# sourceMappingURL=HelloWorldApplicationCustomizer.js.map