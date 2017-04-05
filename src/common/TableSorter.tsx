import * as React from 'react';

export interface TableSorterColumn<T> {
    property: keyof(T);
    headerTemplate?: () => JSX.Element | string;
    template?: (arg: T) => JSX.Element | string;
    valueProvider?: (arg: T) => number | string;
}

type TableSorterProps<T> = {
    columns: TableSorterColumn<T>[];
    data: T[];
    rowKeySelector: (arg: T) => any;
}

export interface TableSorterState<T> {
    sortColumn: string;
    sortAscending: boolean;
}

export class TableSorter<T> extends React.Component<TableSorterProps<T>, TableSorterState<T>> {
    constructor(props) {
        super(props);

        this.state = {
            sortColumn: this.props.columns[0].property,
            sortAscending: true
        };
    }
    handleSortChange (newProp: string) {
        if(this.state.sortColumn === newProp) {
            this.setState({
                sortAscending: !this.state.sortAscending
            });
            return;
        }

        this.setState({
            sortColumn: newProp,
            sortAscending: true
        });
    }
    sort = (a, b) => {
        let sortColumn = this.state.sortColumn,
            sortOrder = this.state.sortAscending ? 1 : -1,
            columnType = typeof(a[sortColumn]);

        // console.log(columnType);
        if(columnType === "number") {
            return this.state.sortAscending ? (a - b) : (b - a);
        }

        return sortOrder * ((a[sortColumn] < b[sortColumn]) ? -1 : (a[sortColumn] > b[sortColumn]) ? 1 : 0);
    }
    render() {
        console.log(this.props.children);
        return (
            <table>
                <thead>
                    <tr>
                        {this.props.columns.map(c => 
                            <th onClick={this.handleSortChange.bind(this, c.property)} key={c.property} style={{cursor: "pointer"}}>
                                {c.headerTemplate ? c.headerTemplate() : c.property}
                                {c.property === this.state.sortColumn ? 
                                    (this.state.sortAscending ? "↑" : "↓")
                                : null}
                            </th>
                        )}
                    </tr>
                    <tr>
                        {React.Children.map(this.props.children, (c: any) => <th>{c.props.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.sort(this.sort).map(d => 
                        <tr key={this.props.rowKeySelector(d)}>
                            {this.props.columns.map(c =>
                                <td key={c.property}>
                                    {c.template ? c.template(d) : d[c.property]}
                                </td>
                            )}
                        </tr>
                    )}
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

interface ColumnProps {
    name: string;
}

export class Column extends React.Component<ColumnProps, any> {
    render() {
        return <tr><td>child</td></tr>
    }
}