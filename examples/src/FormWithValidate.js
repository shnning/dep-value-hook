import { Select, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { useDepState } from "./lib/index";
import { getData, getData2, getData3 } from "./mockData";
import { useForm, Controller } from "react-hook-form";
import "./App.css";

export default function FormWithValidate() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      opt1: "",
      opt2: "",
      opt3: "",
    },
  });

  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

  const [, setOpt1] = useDepState({
    defaultValue: "",
    name: "opt1",
    nextDepName: "opt2",
    effect: async (value) => {
      const data = value ? await getData2(value) : [];
      setOptions2(data);
      setValue("opt2", "");
    },
  });

  const [, setOpt2] = useDepState({
    defaultValue: "",
    name: "opt2",
    prevDepName: "opt1",
    nextDepName: "opt3",
    effect: async (value) => {
      const data = value ? await getData3(value) : [];
      setOptions3(data);
      setValue("opt3", "");
    },
  });

  const [, setOpt3, lose] = useDepState({
    defaultValue: "",
    name: "opt3",
    prevDepName: "opt2",
  });

  useEffect(() => {
    getData().then((data) => {
      setOptions1(data);
      setOpt1(data[0].value);
      setValue("opt1", data[0].value);
    });
  }, []);

  return (
    <section className="form-wrapper">
      <Form onFinish={handleSubmit((data) => alert(JSON.stringify(data)))}>
        <h3>Form With react-hook-form </h3>
        <Form.Item label="opt1">
          <Controller
            name="opt1"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={options1}
                onChange={(value) => {
                  setOpt1(value);
                  onChange(value);
                }}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="opt2">
          <Controller
            name="opt2"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={options2}
                onChange={(value) => {
                  setOpt2(value);
                  onChange(value);
                }}
                value={value}
              />
            )}
          />
        </Form.Item>
        <Form.Item label="opt3">
          <Controller
            name="opt3"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                options={options3}
                onChange={(value) => {
                  setOpt3(value);
                  onChange(value);
                }}
                value={value}
                onClick={() => options3.length === 0 && alert(lose())}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
