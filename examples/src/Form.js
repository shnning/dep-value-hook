import { Select, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { useDepState } from "./lib/index";
import { getData, getData2, getData3 } from "./mockData";
import "./App.css";

export default function App2() {
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);

  const [opt1, setOpt1] = useDepState({
    defaultValue: "",
    name: "opt1",
    nextDepName: "opt2",
    effect: async (value) => {
      const data = value ? await getData2(value) : [];
      setOptions2(data);
    },
  });

  const [opt2, setOpt2] = useDepState({
    defaultValue: "",
    name: "opt2",
    prevDepName: "opt1",
    nextDepName: "opt3",
    effect: async (value) => {
      const data = value ? await getData3(value) : [];
      setOptions3(data);
    },
  });

  const [opt3, setOpt3] = useDepState({
    defaultValue: "",
    name: "opt3",
    prevDepName: "opt2",
  });

  useEffect(() => {
    getData().then((data) => {
      setOptions1(data);
      setOpt1(data[0].value);
    });
  }, []);

  return (
    <section className="form-wrapper">
      <Form>
        <h3>Normal Form</h3>
        <Form.Item label="opt1">
          <Select options={options1} onChange={setOpt1} value={opt1} />
        </Form.Item>
        <Form.Item label="opt2">
          <Select options={options2} onChange={setOpt2} value={opt2} />
        </Form.Item>
        <Form.Item label="opt3">
          <Select options={options3} onChange={setOpt3} value={opt3} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() =>
              alert(JSON.stringify({
                opt1,
                opt2,
                opt3,
              }))
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
