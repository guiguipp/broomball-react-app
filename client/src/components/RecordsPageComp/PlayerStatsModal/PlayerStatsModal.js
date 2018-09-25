import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Line } from "react-chartjs-2";

import { connect } from 'react-redux';
import { togglePlayerModal } from "../../../js/actions/statsActions"

import "./PlayerStatsModal.css"

class PlayerStatsModal extends Component {
    
    render() {
        return (
            <div>
                <Modal isOpen={this.props.playerModal} toggle={this.toggle}>
                    <ModalHeader className="modal_header"> {this.props.playerModalData.name} </ModalHeader>
                    <ModalBody>
                        <Line
                            data={this.props.playerModalData.data}
                            options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    }}
                            />
                    </ModalBody>
                    <ModalFooter>
                        <button className="contrast_color content_button" onClick={()=> this.props.togglePlayerModal(false, {name: "", data:{}})}> Close </button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    playerModal: state.stats.playerModal,
    playerModalData: state.stats.playerModalData
})

export default connect(mapStateToProps, { togglePlayerModal }) (PlayerStatsModal)
