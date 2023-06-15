import React from 'react';
import { Col, Form, message, Row, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useNavigate, useParams  } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import { addNewResume, getResumeById, getResumesById } from '../../../apis/resumes';
import PageTitle from '../../../components/PageTitle';
import SelectSkills from './SelectSkills';

function NewEditResume() {
  const params = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resumeData, setResumeData] = React.useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await addNewResume(values);
      if (response.success) {
        message.success(response.message);
        // navigate("/my-resumes");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getResumesById(params.id);
      dispatch(HideLoading());
      if (response.success) {
        setResumeData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setResumeData({});
    }
  }, []);

  return (
    <div>
      <PageTitle title={'Create resume'} />
      {resumeData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={resumeData}>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="primary-outlined-btn"
              onClick={() => navigate('/my-resumes')}
            > 
              Cancel
            </button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
          <Row gutter={[10, 10]}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                label="Contacts"
                name="contacts"
                rules={[{ required: true, message: "required" }]}
              > 
                <Input />        
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Summary"
                name="summary"
                rules={[{ required: true, message: "required" }]}
              >
                <Input.TextArea style={{height: '100px'}} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true, message: "required" }]}
              >
                <SelectSkills />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Languages"
                name="languages"
                rules={[{ required: true, message: "required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.List name="experiences">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={[10, 10]} align="middle" key={key}>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, "company"]}
                        rules={[{ required: true, message: "required" }]}
                        label="Company"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "position"]}
                        rules={[{ required: true, message: "required" }]}
                        label="Position"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        label="Start Date"
                        name={[name, "start_date"]}
                        rules={[{ required: true, message: "required" }]}
                      >
                        <input type="date" />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        label="End Date"
                        name={[name, "end_date"]}
                        rules={[{ required: true, message: "required" }]}
                      >
                        <input type="date" />
                      </Form.Item>
                    </Col>
                    <i
                      className="ri-delete-bin-line"
                      onClick={() => remove(name)}
                    ></i>
                  </Row>
                ))}
                <Form.Item>
                  <button 
                    className="primary-outlined-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      add();
                    }}
                  >
                    ADD EXPERIENCE
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
                        name={[name, 'degree']}
                        rules={[{ required: true, message: 'required' }]}
                        label="Degree"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, 'institution']}
                        rules={[{ required: true, message: 'required' }]}
                        label="Institution"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        label="Start Date"
                        name={[name, "start_date"]}
                        rules={[{ required: true, message: "required" }]}
                      >
                        <input type="date" />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        label="End Date"
                        name={[name, "end_date"]}
                        rules={[{ required: true, message: "required" }]}
                      >
                        <input type="date" />
                      </Form.Item>
                    </Col>
                    <i
                      className="ri-delete-bin-line"
                      onClick={() => remove(name)}
                    ></i>
                  </Row>
                ))}
                <Form.Item>
                  <button
                    className="primary-outlined-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      add();
                    }}
                  >
                    ADD EDUCATION
                  </button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </div>
  );
}

export default NewEditResume;
