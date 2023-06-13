import React from 'react'
import { Col,Form, message,Row } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import { addNewResume, editResumeDetails, getResumeById } from '../../../apis/resumes';
import PageTitle from '../../../components/PageTitle';

function NewEditResume() {
  const params=useParams();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const[resumeData,setResumeData]=React.useState(null);
  const onFinish=async(values)=>{
    try {
      dispatch(ShowLoading());
      let response = null;
      if (params.id) {
        response = await editResumeDetails({
          ...values,
          id: params.id,
        });
      } else {
        response = await addNewResume(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/my-resumes");
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
      const response = await getResumeById(params.id);
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
      <PageTitle title={params.id ? "Edit Resume" : ""} />
      {resumeData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={resumeData}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "required" }]}
            >
              <input type='text'></input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
            label="Contacts"
            name="contacts"
            rules={[{ required: true, message: "required" }]}> 
            <input type='text'></input>           
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Summary"
              name="summary"
              rules={[{ required: true, message: "required" }]}
            >
              <textarea type='text' style={{height: '100px'}}></textarea>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Skills"
              name="skills"
              rules={[{ required: true, message: "required" }]}
            >
              <input type='text'></input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Languages"
              name="languages"
              rules={[{ required: true, message: "required" }]}
            >
              <input type='text'></input>
            </Form.Item>
          </Col>
        </Row>
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
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} align="middle">
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
        <div className="d-flex justify-content-end gap-2">
          <button
            className="primary-outlined-btn"
            onClick={() => navigate("/resumes")}
          >
            Cancel
          </button>
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
      
      )}
    </div>
  )
}

export default NewEditResume;