import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Line } from "react-chartjs-2";


import { connect } from 'react-redux';
import { togglePlayerModal } from "../../../js/actions/statsActions"


class PlayerStatsModal extends Component {
    
    render() {
        return (
            <div>
                <Modal isOpen={this.props.playerModal} toggle={this.toggle}>
                    <ModalBody>
                        <Line
                            data={this.props.playerModalData}
                            options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                    }}
                            />
                    </ModalBody>
                    <ModalFooter>
                        <button className="contrast_color" onClick={()=> this.props.togglePlayerModal(false)}> Close </button>
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
