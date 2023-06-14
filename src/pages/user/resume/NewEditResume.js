import React from 'react'
import { Col,Form, message,Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import { addNewResume } from '../../../apis/resumes';
import PageTitle from '../../../components/PageTitle';

function NewEditResume() {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    console.log("Form Submitted");
    try {
      dispatch(ShowLoading());
      const response = await addNewResume(values);
      if (response.success) {
        message.success(response.message);
        navigate("/posted-jobs");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  return (
    <div>
      <PageTitle title={"Add New Resume"} />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "required" }]}
              >
                <input type='text' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
              label="Contacts"
              name="contacts"
              rules={[{ required: true, message: "required" }]}> 
              <input type='text' />       
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Summary"
                name="summary"
                rules={[{ required: true, message: "required" }]}
              >
                <textarea type="text" style={{height: '100px'}}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true, message: "required" }]}
              >
                <input type='text' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Languages"
                name="languages"
                rules={[{ required: true, message: "required" }]}
              >
                <input type='text' />
              </Form.Item>
            </Col>
          
            <Col span={24}>
              <Form.List name="experinces">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={[10, 10]} align="middle">
                      <Col span={6}>
                        <Form.Item
                          {...restField}
                          name={[name, "company"]}
                          rules={[{ required: true, message: "required" }]}
                          label="Company"
                        >
                          <input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          {...restField}
                          name={[name, "position"]}
                          rules={[{ required: true, message: "required" }]}
                          label="Position"
                        >
                          <input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="Start Date"
                          name="start_date"
                          rules={[{ required: true, message: "required" }]}
                        >
                          <input type="date" />
                        </Form.Item>
                      </Col>
                      <Col span={5}>
                        <Form.Item
                          label="End Date"
                          name="end_date"
                          rules={[{ required: true, message: "required" }]}
                        >
                          <input type="date" />
                        </Form.Item>
                      </Col>
                      <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
                    </Row>
                  ))}
                  
                  <Form.Item>
                    <button className="primary-outlined-btn" onClick={() => add()}>
                      ADD EXPERINCE
                    </button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={24}>
            <Form.List name="educations">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={[10, 10]} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "institution"]}
                          rules={[{ required: true, message: "required" }]}
                          label="Institution"
                        >
                          <input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, "degree"]}
                          rules={[{ required: true, message: "required" }]}
                          label="Degree"
                        >
                          <input type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Start Date"
                          name="start_date"
                          rules={[{ required: true, message: "required" }]}
                        >
                          <input type="date" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="End Date"
                          name="end_date"
                          rules={[{ required: true, message: "required" }]}
                        >
                          <input type="date" /> 
                        </Form.Item>
                      </Col>
                      <i class="ri-delete-bin-line" onClick={() => remove(name)}></i>
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
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="primary-outlined-btn"
            onClick={() => navigate("/applied-jobs")}
          >
            Cancel
          </button>
          <button className="primary-contained-btn" type="submit">
            Save
          </button>

        </div>
      </Form>
    </div>
  )
}

export default NewEditResume;