import React, { useState } from 'react'
import './AddServerIcon.css'
import { CloseButton, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import AddIcon from '@mui/icons-material/Add'
import { createGroup } from '../../firebase/groups/createGroup'
import CustomSVG from './CustomSVG'

type Props = {
    onGroupCreate: () => void
}

const AddServerIcon = ({ onGroupCreate }: Props) => {
    /* Show or Hide Popup when clicking button */
    const [showModal, setModal] = useState(false)
    const [groupName, setGroupName] = useState('')

    const handleClose = () => {
        setModal(false)
    }

    const handleShow = () => {
        setModal(true)
    }
    /* Prevent user from right-click this button */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const handleCreateGroup = async () => {
        try {
            await createGroup(groupName)
            handleClose()
            onGroupCreate()
        } catch (error) {
            console.error('Error creating group:', error)
        }
    }

    const handleGroupNameChange = (event: any) => {
        setGroupName(event.target.value)
    }

    return (
        <div data-testid="add-server-icon">
            <button
                data-testid="add-server-icon-button"
                onContextMenu={handleContextMenu}
                onClick={handleShow}
                className="addServerIcon"
            >
                <AddIcon htmlColor="white" fontSize="large" />
            </button>

            <Modal
                data-testid="add-server-modal"
                show={showModal}
                onHide={handleClose}
                centered
            >
                <Modal.Header className="addServerModalHeader">
                    <CloseButton
                        data-testid="add-server-modal-close-button"
                        onClick={handleClose}
                    />
                    <h1>Customize your server</h1>
                    <div>
                        Give your new server a personality with a name and an
                        icon. You can always change it later.
                    </div>
                </Modal.Header>

                <Modal.Body className="addServerModalBody">
                    <div className="addServerModalBodyContent">
                        <CustomSVG />
                    </div>

                    <form>
                        <label
                            data-testid="add-server-modal-label"
                            className="addServerModalBodyFormHeader"
                        >
                            SERVER NAME
                        </label>
                        <input
                            data-testid="add-server-modal-input"
                            className="addServerModalBodyFormContent"
                            placeholder="server name"
                            type="text"
                            onChange={handleGroupNameChange}
                            value={groupName}
                        />
                    </form>
                </Modal.Body>

                <Modal.Footer className="addServerModalFooter">
                    <Button
                        data-testid="add-server-modal-create-button"
                        onClick={handleCreateGroup}
                        className="addServerModalFooterButton"
                        disabled={!groupName.trim()}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddServerIcon