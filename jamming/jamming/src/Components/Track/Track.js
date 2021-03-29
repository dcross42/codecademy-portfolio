import React from 'react';
import './Track.css'

class Track extends React.Component {

    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
    }


    render(){
        let button = this.renderAction();
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {button}
            </div>
        );
    }
    
    renderAction(){
        if(this.props.isRemoval){
            return (
                <button className="Track-action" value="-" onClick={this.removeTrack}/>
            );
        }
        else{
            return (
                <button className="Track-action" value="+" onClick={this.addTrack}/>
            );
        }
        
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }
}

export default Track;