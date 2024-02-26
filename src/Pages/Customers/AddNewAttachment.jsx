import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import ReactHotToast from "../../utils/ReactHotToast/ReactHotToast";
import { apiUrl, headerOptions } from "../../utils/Constants/constants";
import { SpinningLoader } from "../../Templates/SpinningLoader/SpinningLoader";
import { PlusIconSVG } from "../../utils/SVGs/SVGs";

const MyVerticallyCenteredModal = ({
  show,
  onHide,
  setIsUpdated,
  attachments,
  setAttachments,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [newAttachment, setNewAttachment] = useState("");

  const handleAddNewAttachment = (e) => {
    e.preventDefault();
    const updatedAttachments = [
      ...attachments,
      { id: attachments.length + 1, name: newAttachment },
    ];
    setAttachments(updatedAttachments);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="pt-3 pb-1" closeButton>
        <Modal.Title className="w-100" id="contained-modal-title-vcenter">
          New Attachment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleAddNewAttachment}
          className="d-flex flex-column gap-3 justify-content-center align-items-center"
        >
          <div className="group">
            <label htmlFor="attachment">Attachment File</label>
            <input
              type="file"
              id="attachment"
              accept="image/png, image/jpeg, .doc,.docx,application/msword"
              onChange={(e) => {
                setNewAttachment(e.target.files[0].name);
              }}
            />
          </div>

          <button type="submit" className="cta-btn" disabled={isDisabled}>
            {isDisabled ? <SpinningLoader /> : "Add New Attachment"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export const AddNewAttachment = ({
  setIsUpdated,
  attachments,
  setAttachments,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button onClick={() => setModalShow(true)} className="cta-btn">
        Add Attachment
        <span>
          <PlusIconSVG />
        </span>
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setIsUpdated={setIsUpdated}
        attachments={attachments}
        setAttachments={setAttachments}
      />
    </>
  );
};
