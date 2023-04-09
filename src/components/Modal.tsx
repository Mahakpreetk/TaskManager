import { Button, Modal, Spinner } from 'flowbite-react';
import React from 'react';
import { AsyncState } from 'src/models/store';

interface CustomModalProps {
  show: boolean,
  status?: AsyncState,
  color?: string,
  title: string,
  body: React.ReactNode
  onCancel: () => void,
  onProceed?: () => void,
}

const CustomModal: React.FC<CustomModalProps> = ({ onProceed, onCancel, show, title, body, status, color }) => {
  const portalRoot = document.getElementById('portal')!;
  return (
    <Modal
      dismissible={false}
      show={show}
      root={portalRoot}
      size={'md'}
      onClose={onCancel}
    >
      <Modal.Header>
        <h1 className={`text-${color}-600`}>{title}</h1>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        {onProceed &&
          <Button className={`bg-${color}-600 hover:bg-${color}-600`} disabled={status === 'pending'} onClick={onProceed}>
            {status === 'pending' ?
              <div className="mr-5">
                <Spinner
                  size="sm"
                  light={true}
                />
              </div> : <>Proceed</>
            }
          </Button>
        }
        <Button
          color="gray"
          disabled={status === 'pending'}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal
