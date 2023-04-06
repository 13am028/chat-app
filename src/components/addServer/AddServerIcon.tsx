import React, { useState } from 'react'
import './AddServerIcon.css'
import { CloseButton, Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import AddIcon from '@mui/icons-material/Add'
import { createGroup } from '../../firebase/groups/createGroup'
import CustomSVG from './CustomSVG'
import UploadWidget from '../upload/UploadWidget'

type Props = {
    onGroupCreate: () => void
}

const AddServerIcon = ({ onGroupCreate }: Props) => {
    /* Show or Hide Popup when clicking button */
    const [showModal, setModal] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [imageURL, setImageUrl] = useState('')

    const handleClose = () => {
        setModal(false)
    }

    const handleShow = () => {
        setModal(true)
    }

    const handleShowUploadModal = () => {
        setShowUploadModal(true)
    }

    const handleCloseUploadModal = () => {
        setShowUploadModal(false)
    }

    /* Prevent user from right-click this button */
    const handleContextMenu = (event: any) => {
        event.preventDefault()
    }

    const handleCreateGroup = async () => {
        try {
            await createGroup(groupName, imageURL)
            handleClose()
            onGroupCreate()
        } catch (error) {
            console.error('Error creating group:', error)
        }
    }

    const handleGroupNameChange = (event: any) => {
        setGroupName(event.target.value)
    }

    const handleURL = (url: string) => {
        handleCloseUploadModal()
        console.log(url)
        setImageUrl(url)
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
                    <h1 style={{ color: 'black' }}>Customize your server</h1>
                    <div>
                        Give your new server a personality with a name and an
                        icon. You can always change it later.
                    </div>
                </Modal.Header>

                <Modal.Body className="addServerModalBody">
                    <div className="addServerModalBodyContent">
                        <div onClick={handleShowUploadModal}>
                            <CustomSVG />
                        </div>

                        <Modal
                            show={showUploadModal}
                            onHide={handleCloseUploadModal}
                            centered
                            data-testid="change-avatar-modal"
                        >
                            <Modal.Header closeButton>
                                <h4
                                    className="modal-title"
                                    data-testid="modal-title"
                                >
                                    Upload Group Picture
                                </h4>
                            </Modal.Header>
                            <Modal.Body>
                                <UploadWidget handleURL={handleURL} />
                            </Modal.Body>
                        </Modal>
                    </div>
                    <div
                        className="addServerModalBodyFormContainer"
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
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
                    </div>
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
