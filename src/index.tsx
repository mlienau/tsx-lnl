import * as React from "react";
import * as ReactDOM from "react-dom";
import { CurrencyInput } from "./common/CurrencyInput";

interface AppState {
    currency: number;
}
class App extends React.Component<any, AppState> {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            currency: 69
        };
    }
    handleCurrencyChange = (e) => {
        this.setState({
            currency: parseFloat(e.target.value)
        });
    }
    render() {
        return (
            <div>
                <CurrencyInput value={this.state.currency} onChange={this.handleCurrencyChange} />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("mount-node")
);