
import { useCalendarStore } from "../../hooks";

export const FabAddDelete = () => {

    const { startDeletingEvents, hasEventSelected } = useCalendarStore();

    const handleClickDelete = () => {
        startDeletingEvents();
    };

    return (
        <button className="btn btn-danger fab-danger"
            onClick={handleClickDelete}
            style={{
                display: hasEventSelected ? '' : 'none'
            }}>
            <i className="fa fa-trash-alt"></i>
        </button>
    )
}
