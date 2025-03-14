export default function Movie(props) {
    //Props are read-only.
    //Prop values are passed from parent component and
    //are not set by the child component (this).
    //A state is initialized and managed by component.
    //If something needs to be changed in the component
    //use a state rather than a prop.
    return (
    <p>{props.title} ({props.year})</p>
    );
    }