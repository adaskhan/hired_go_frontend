import { Col, Form, message, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewJobPost, editJobDetails, getJobById } from "../../../apis/jobs";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";

function NewEditJob() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = React.useState(null);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (params.id) {
        response = await editJobDetails({
          ...values,
          id: params.id,
        });
      } else {
        response = await addNewJobPost(values);
      }
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
  };

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getJobById(params.id);
      dispatch(HideLoading());
      if (response.success) {
        setJobData(response.data);
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
      setJobData({});
    }
  }, []);

  return (
    <div>
      <PageTitle title={params.id ? "Edit Job" : "Add New Job Post"} />
      {jobData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tech Stack"
              name="tech_stack"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="Almaty">Almaty</option>
                <option value="Astana">Astana</option>
                <option value="Kokshetau">Kokshetau</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Company Name"
              name="company_name_id"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Job Type"
              name="vacancy_type"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="End Date"
              name="end_date"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Skills"
              name="skills"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="description"
              rules={[{ required: true, message: "required" }]}
            >
              <textarea type="text" style={{height: '200px'}}/>
            </Form.Item>
          </Col>
        </Row>
      
        <div className="d-flex justify-content-end gap-2">
          <button
            className="primary-outlined-btn"
            onClick={() => navigate("/posted-jobs")}
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
  );
}

export default NewEditJob;