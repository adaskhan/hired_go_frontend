import { Col, Form, Row } from "antd";

function List() {
    return (
      <>
        <Form.List name="experiences">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[10, 10]} align="middle" key={key}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Company"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...restField}
                      name={[name, "designation"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Designation"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "duration"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Duration"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "location"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Location"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item>
                <button className="primary-outlined-btn" onClick={() => add()}>
                  ADD EXPERIENCE
                </button>
              </Form.Item>
            </>
          )}
        </Form.List>
  
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[10, 10]} align="middle" key={key}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Title"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={10} className="mt-4">
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Description"
                    >
                      <textarea type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "duration"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Duration"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
  
                  <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item>
                <button className="primary-outlined-btn" onClick={() => add()}>
                  ADD PROJECT
                </button>
              </Form.Item>
            </>
          )}
        </Form.List>
  
        <Form.List name="education">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[10, 10]} align="middle" key={key}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Degree"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Institution"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...restField}
                      name={[name, "percentage"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Percentage"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item>
                <button className="primary-outlined-btn" onClick={() => add()}>
                  ADD EDUCATION
                </button>
              </Form.Item>
            </>
          )}
        </Form.List>
  
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[10, 10]} align="middle" key={key}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "technology"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Technology"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "rating"]}
                      rules={[{ required: true, message: "required" }]}
                      label="Rating"
                    >
                      <input type="text" />
                    </Form.Item>
                  </Col>
  
                  <i className="ri-delete-bin-line" onClick={() => remove(name)}></i>
                </Row>
              ))}
              <Form.Item>
                <button className="primary-outlined-btn" onClick={() => add()}>
                  ADD SKILLS
                </button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </>
    );
  }
  
  export default List;
  