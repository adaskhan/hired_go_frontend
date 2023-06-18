import { Col, Form, message, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNewJobPost, editJobDetails, getJobById } from "../../../apis/jobs";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import SelectSkills from '../resume/SelectSkills';

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
      <PageTitle title={params.id ? "Изменить вакансию" : "Объявить о вакансии"} />
      {jobData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={jobData}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Вакансия"
              name="title"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Стэк технологии"
              name="tech_stack"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
              <option value="">Стэк</option>
              <option value="Python">Python</option>
              <option value="JavaScript">Java</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
              <option value="PHP">PHP</option>
              <option value="Go">Go</option>
              <option value="Cpp">C++</option>
              <option value="Csh">C#</option>
              <option value="Swift">Swift</option>
              <option value="Kotlin">Kotlin</option>
              <option value="TypeScript">TypeScript</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Локация"
              name="location"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
              <option value="">Локация</option>
              <option value="Almaty">Алматы</option>
              <option value="Astana">Астана</option>
              <option value="Kostanai">Костанай</option>
              <option value="Kyzylorda">Кызылорда</option>
              <option value="Taraz">Тараз</option>
              <option value="Shymkent">Шымкент</option>
              <option value="Semei">Семей</option>
              <option value="Pavlodar">Павлодар</option>
              <option value="Aktobe">Актобе</option>
              <option value="Kokshetau">Кокшетау</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Компания"
              name="company_name_id"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Заработная плата"
              name="salary"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Тип работы"
              name="vacancy_type"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="Office">Офис</option>
                <option value="Remote">Удаленка</option>
                <option value="Remote">Гибрид</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Доступно с"
              name="start_date"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Доступно до"
              name="end_date"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Опыт работы"
              name="experience"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Навыки"
              name="skills"
              rules={[{ required: true, message: "required" }]}
            >
              <SelectSkills />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Описание"
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
            Отмена
          </button>
          <button className="primary-contained-btn" type="submit">
            Сохранить
          </button>
        </div>
      </Form>
      
      )}
    </div>
  );
}

export default NewEditJob;