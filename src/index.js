"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var application_1 = require("@jupyterlab/application");
__exportStar(require("./index"), exports);
var apputils_1 = require("@jupyterlab/apputils");
var widgets_1 = require("@lumino/widgets");
var APODWidget = /** @class */ (function (_super) {
    __extends(APODWidget, _super);
    /**
     * Construct a new APOD widget.
     */
    function APODWidget() {
        var _this = _super.call(this) || this;
        _this.addClass('my-apodWidget');
        // Add an image element to the panel
        _this.img = document.createElement('img');
        _this.node.appendChild(_this.img);
        // Add a summary element to the panel
        _this.summary = document.createElement('p');
        _this.node.appendChild(_this.summary);
        return _this;
    }
    /**
     * Handle update requests for the widget.
     */
    APODWidget.prototype.onUpdateRequest = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + this.randomDate())];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data_1 = _a.sent();
                        if (data_1.error) {
                            this.summary.innerText = data_1.error.message;
                        }
                        else {
                            this.summary.innerText = response.statusText;
                        }
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = (_a.sent());
                        if (data.media_type === 'image') {
                            // Populate the image
                            this.img.src = data.url;
                            this.img.title = data.title;
                            this.summary.innerText = data.title;
                            if (data.copyright) {
                                this.summary.innerText += " (Copyright " + data.copyright + ")";
                            }
                        }
                        else {
                            this.summary.innerText = 'Random APOD fetched was not an image.';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a random date string in YYYY-MM-DD format.
     */
    APODWidget.prototype.randomDate = function () {
        var start = new Date(2010, 1, 1);
        var end = new Date();
        var randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().slice(0, 10);
    };
    return APODWidget;
}(widgets_1.Widget));
/**
 * Activate the APOD widget extension.
 */
function activate(app, palette, restorer) {
    console.log('JupyterLab extension jupyterlab_apod is activated!');
    // Declare a widget variable
    var widget;
    // Add an application command
    var command = 'apod:open';
    app.commands.addCommand(command, {
        label: 'Random Astronomy Picture',
        execute: function () {
            if (!widget || widget.isDisposed) {
                // Create a new widget if one does not exist
                // or if the previous one was disposed after closing the panel
                var content = new APODWidget();
                widget = new apputils_1.MainAreaWidget({ content: content });
                widget.id = 'apod-jupyterlab';
                widget.title.label = 'Astronomy Picture';
                widget.title.closable = true;
            }
            if (!tracker.has(widget)) {
                // Track the state of the widget for later restoration
                tracker.add(widget);
            }
            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main');
            }
            widget.content.update();
            // Activate the widget
            app.shell.activateById(widget.id);
        }
    });
    // Add the command to the palette.
    palette.addItem({ command: command, category: 'Tutorial' });
    // Track and restore the widget state
    var tracker = new apputils_1.WidgetTracker({
        namespace: 'apod'
    });
    // @ts-ignore
    restorer.restore(tracker, {
        command: command,
        name: function () { return 'apod'; }
    });
}
/**
 * Initialization data for the jupyterlab_apod extension.
 */
var extension = {
    id: 'jupyterlab_apod',
    autoStart: true,
    requires: [apputils_1.ICommandPalette, application_1.ILayoutRestorer],
    activate: activate
};
exports["default"] = extension;
