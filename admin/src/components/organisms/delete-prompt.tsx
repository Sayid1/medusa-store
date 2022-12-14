import React, { useState } from "react"
import useNotification from "../../hooks/use-notification"
import { getErrorMessage } from "../../utils/error-messages"
import Button from "../fundamentals/button"
import Modal from "../molecules/modal"

type DeletePromptProps = {
  heading?: string
  text?: string
  successText?: string
  cancelText?: string
  confirmText?: string
  handleClose: () => void
  onDelete: () => Promise<unknown>
}

const DeletePrompt: React.FC<DeletePromptProps> = ({
  heading = "你确定要删除吗?",
  text = "",
  successText = "删除成功",
  cancelText = "取消",
  confirmText = "确认",
  handleClose,
  onDelete,
}) => {
  const notification = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    onDelete()
      .then(() => notification("成功", successText, "success"))
      .catch((err) => notification("错误", getErrorMessage(err), "error"))
      .finally(() => {
        setIsLoading(false)
        handleClose()
      })
  }

  return (
    <Modal isLargeModal={false} handleClose={handleClose}>
      <Modal.Body>
        <Modal.Content>
          <div className="flex flex-col">
            <span className="inter-large-semibold">{heading}</span>
            <span className="inter-base-regular mt-1 text-grey-50">{text}</span>
          </div>
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full h-8 justify-end">
            <Button
              variant="ghost"
              className="mr-2 w-24 text-small justify-center"
              size="small"
              onClick={handleClose}
            >
              {cancelText}
            </Button>
            <Button
              loading={isLoading}
              size="small"
              className="w-24 text-small justify-center"
              variant="nuclear"
              onClick={handleSubmit}
            >
              {confirmText}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default DeletePrompt
