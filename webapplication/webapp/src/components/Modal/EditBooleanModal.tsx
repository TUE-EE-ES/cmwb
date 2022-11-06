import * as React from 'react'
import { Modal } from 'react-bootstrap'
import { ModalFooter } from './ModalFooter'
import { EditBoolean } from '../Controls/EditBoolean'

interface Props {
}

interface State {
    show: boolean,
    header: string,
    question: string,
    value: boolean
}


export class EditBooleanModal extends React.Component<Props, State> {

    constructor(props: any) {
        super(props)
        this.state = { 
            show: false, 
            header: "", 
            question: "", 
            value: false
        }
        this._okCallback = undefined
        this._cancelCallback = undefined
        this.editBoolean = React.createRef()
    }

    private _okCallback: (result: boolean) => void
    private _cancelCallback: () => void
    private editBoolean: React.RefObject<EditBoolean>


    public show(header: string, question: string, defaultValue: boolean, okCallback: (result: boolean) => void, cancelCallback: () => void) {
        this._okCallback = okCallback
        this._cancelCallback = cancelCallback
        this.setState({ show: true, header: header, question: question, value: defaultValue})
    }

    private setShow(value: boolean) {
        this.setState({ show: value })
    }

    private handleCloseOK() {
        this.setShow(false)
        if (!(this._okCallback === undefined)) {
            this._okCallback(this.state.value)
        }
        this._okCallback = undefined
        this._cancelCallback = undefined
    }

    private handleCloseCancel() {
        this.setShow(false)
        if (!(this._cancelCallback === undefined)) {
            this._cancelCallback()
        }
        this._okCallback = undefined
        this._cancelCallback = undefined
    }

    private handleKeyUp(e: { key: string }) {
        if (e.key === 'Enter') {
          this.handleCloseOK()
        }
        if (e.key === 'Escape') {
            this.handleCloseCancel()
          }
      }


      render() {
        return (
            <Modal show={this.state.show} onHide={() => this.handleCloseCancel()} onEnter={()=>{this.editBoolean.current.focus()}} className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditBoolean 
                        ref={this.editBoolean}
                        question={this.state.question} 
                        onChange={(value: boolean)=>this.setState({value})}
                        onKeyUp={(e: any) => this.handleKeyUp(e)}
                    ></EditBoolean>
                </Modal.Body>
                <ModalFooter 
                    validate={()=>true}
                    okCallback={()=>this.handleCloseOK()}
                    cancelCallback={()=>this.handleCloseCancel()}
                />
            </Modal>
        )
    }

}

