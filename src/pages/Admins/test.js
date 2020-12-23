Murtadha, [06.12.20 11:40]
import React from "react";
import { Card, Button, Row, Col, Upload, message } from "antd";
import { FiUpload } from "react-icons/fi";
import { StudentStore } from "../../store";

export function Archives({ title, onNext, onPrevious }) {
  const {
    image,
    idPhoto,
    passport,
    nationalId,
    livingId,
    rationId,
    setImage,
    setIdPhoto,
    setPassport,
    setNationalId,
    setLivingId,
    setRationId,
  } = StudentStore();

  const InputFiled = (label, input) => (
    <div style={{ marginBottom: 30 }}>
      <p style={{ fontWeight: "bold", marginBottom: 6 }}>{label}</p>
      {input}
    </div>
  );

  const uploadProps = {
    name: "file",
    action: "https://mashriq.herokuapp.com/dash/v1/file",
  };

  const handleUploadChange = (info, name) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      let dataInfo = {
        uid: info.file.uid,
        name: info.file.name,
        url: info.file.response.data.url,
      };

      switch (name) {
        case "setIdPhoto":
          setIdPhoto(dataInfo);
          break;
        case "setImage":
          setImage(dataInfo);
          break;
        case "setLivingId":
          setLivingId(dataInfo);
          break;
        case "setNationalId":
          setNationalId(dataInfo);
          break;
        case "setPassport":
          setPassport(dataInfo);
          break;
        case "setRationId":
          setRationId(dataInfo);
          break;

        default:
          break;
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemove = (name) => {
    switch (name) {
      case "setIdPhoto":
        setIdPhoto(null);
        break;
      case "setImage":
        setImage(null);
        break;
      case "setLivingId":
        setLivingId(null);
        break;
      case "setNationalId":
        setNationalId(null);
        break;
      case "setPassport":
        setPassport(null);
        break;
      case "setRationId":
        setRationId(null);
        break;

      default:
        break;
    }
  };

  return (
    <Card>
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <Row>
          <Col span={11}>
            {InputFiled(
              "الهوية",
              <Upload
                {...uploadProps}
                defaultFileList={idPhoto && [idPhoto]}
                onChange={(e) => handleUploadChange(e, "setIdPhoto")}
                onRemove={(e) => handleRemove("setIdPhoto")}
                style={{ width: "100%" }}
              >
                <Button disabled={idPhoto ? true : false}>
                  صورة الهوية <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>
          <Col span={1} />
          <Col span={11}>
            {InputFiled(
              "شهادة الجنسية",
              <Upload
                {...uploadProps}
                defaultFileList={nationalId && [nationalId]}
                onChange={(e) => handleUploadChange(e, "setNationalId")}
                onRemove={(e) => handleRemove("setNationalId")}
                style={{ width: "100%" }}
              >
                <Button disabled={nationalId ? true : false}>
                  صورة شهادة الجنسية <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>
          <Col span={1} />
          <Col span={11}>
            {InputFiled(
              "صورة شخصية",
              <Upload
                {...uploadProps}
                defaultFileList={image && [image]}
                onChange={(e) => handleUploadChange(e, "setImage")}
                onRemove={(e) => handleRemove("setImage")}
                style={{ width: "100%" }}
              >
                <Button disabled={image ? true : false}>
                  صورة شخصية <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>

Murtadha, [06.12.20 11:40]
<Col span={1} />
          <Col span={11}>
            {InputFiled(
              "بطاقة السكن",
              <Upload
                {...uploadProps}
                defaultFileList={livingId && [livingId]}
                onChange={(e) => handleUploadChange(e, "setLivingId")}
                onRemove={(e) => handleRemove("setLivingId")}
                style={{ width: "100%" }}
              >
                <Button disabled={livingId ? true : false}>
                  صورة بطاقة السكن <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>
          <Col span={1} />
          <Col span={11}>
            {InputFiled(
              "الجواز",
              <Upload
                {...uploadProps}
                defaultFileList={passport && [passport]}
                onChange={(e) => handleUploadChange(e, "setPassport")}
                onRemove={(e) => handleRemove("setPassport")}
                style={{ width: "100%" }}
              >
                <Button disabled={passport ? true : false}>
                  صورة الجواز <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>
          <Col span={1} />
          <Col span={11}>
            {InputFiled(
              "البطاقة التموينية",
              <Upload
                {...uploadProps}
                defaultFileList={rationId && [rationId]}
                onChange={(e) => handleUploadChange(e, "setRationId")}
                onRemove={(e) => handleRemove("setRationId")}
                style={{ width: "100%" }}
              >
                <Button disabled={rationId ? true : false}>
                  صورة البطاقة التموينية <FiUpload />
                </Button>
              </Upload>
            )}
          </Col>
        </Row>
      </div>
      <div className="card-footer">
        <Button type="primary" onClick={onNext} >
          التالـــي
        </Button>
        <Button
          type="default"
          style={{ marginLeft: 16, border: "none" }}
          onClick={onPrevious}
        >
          السابق
        </Button>
      </div>
    </Card>
  );
}