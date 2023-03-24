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
    const [groupName, setgroupName] = useState('')

    const handleClose = () => {
        setModal(false)
    }

    const handleShow = () => {
        setModal(true)
    }
    /* Prevent user from right click this button */
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
        setgroupName(event.target.value)
    }

    return (
        <div>
            <button
                onContextMenu={handleContextMenu}
                onClick={handleShow}
                className="addServerIcon"
            >
                <AddIcon htmlColor="white" fontSize="large" />
            </button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header className="addServerModalHeader">
                    <CloseButton onClick={handleClose} />
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
                        <label className="addServerModalBodyFormHeader">
                            SERVER NAME
                        </label>
                        <input
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
