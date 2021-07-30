import { ICommandPalette, MainAreaWidget, ReactWidget // ReactWidget widget that will be used instead of Widget from @lumino/widgets
 } from '@jupyterlab/apputils';
import * as React from 'react';
// This is the React.Component that that will be used by ReactWidget to render to the DOM
class HelloMessage extends React.Component {
    render() {
        return ( // It is possible to use HTML tags bellow because the file format is .tsx and not .ts
        React.createElement("div", null,
            "Hello ",
            this.props.name)); // The this.prop.name is the feature that provides by the 'prop-types' package. This is the feature of React Components
    }
}
/**
 * Initialization data for the jlab_react extension.
 */
const extension = {
    id: 'jlab-react',
    autoStart: true,
    requires: [ICommandPalette],
    activate: (app, palette) => {
        console.log('JupyterLab extension jlab_react is activated!');
        // Create a blank content widget inside of a MainAreaWidget
        const content = ReactWidget.create(React.createElement(HelloMessage, { name: "Bernard Black" })); // The name="Bernard Black" will be replaced by {this.props.name} in the HelloMessage during rendering.
        const mainWidget = new MainAreaWidget({ content });
        mainWidget.id = 'react-jupyterlab';
        mainWidget.title.label = 'React Test JLab';
        mainWidget.title.closable = true;
        // Add an application command
        const command = 'jlreact:open';
        app.commands.addCommand(command, {
            label: 'React Test JLab',
            execute: () => {
                if (!mainWidget.isAttached) {
                    // Attach the widget to the main work area if it's not there
                    app.shell.add(mainWidget, 'main');
                }
                // Activate the widget
                app.shell.activateById(mainWidget.id);
            }
        });
        // Add the command to the palette.
        palette.addItem({ command, category: 'Tutorial' });
    }
};
export default extension;
