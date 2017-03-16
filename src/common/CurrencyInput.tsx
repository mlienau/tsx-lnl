import * as React from 'react';

export interface CurrencyInputProps {
    value: number;
    onChange: (e: any) => void;
}

export interface CurrencyInputState {
    focused: boolean;
}

export class CurrencyInput extends React.Component<CurrencyInputProps, CurrencyInputState> {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }
    handleFocus = () => {
        this.setState({focused: true});
    }
    handleBlur = () => {
        this.setState({focused: false});
    }
    render() {
        return (
            <input value={this.state.focused ? this.props.value : this.props.value.toLocaleString("en-US", {style: "currency", currency: "USD"})} 
                onChange={this.props.onChange} 
                onFocus={this.handleFocus}
                onBlur={this.handleBlur} />
        );
    }
}