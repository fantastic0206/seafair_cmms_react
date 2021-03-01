import React from "react";
import Input, { InputGroup, Textarea } from "@iso/components/uielements/input";
import { Col, Row, Form } from "antd";
const FormItem = Form.Item;

export default function (props) {
    const {value, onChange, help, style} = props;
    return (
        <div style={style}>
            {value == ""? 
                (
                <FormItem
                    // {...formItemLayout}
                    hasFeedback
                    validateStatus="error"
                    help={help}
                >
                    <Input
                    label="Asset"
                    value={value}
                    placeholder=""
                    onChange={(event) => {
                        onChange(event);
                    }}
                    />
                </FormItem>
                ) :
                (
                <FormItem
                    // {...formItemLayout}
                    hasFeedback
                    validateStatus="success"
                >
                    <Input
                    label="Asset"
                    value={value}
                    placeholder=""
                    onChange={(event) => {
                        onChange(event);
                    }}
                    />
                </FormItem>
                )
            }
        </div>
    )
}
