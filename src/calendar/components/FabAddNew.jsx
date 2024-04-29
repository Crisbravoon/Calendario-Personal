
import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {


    const { toggleDateModal } = useUiStore();

    const { setActiveEvents } = useCalendarStore();

    const handleClick = () => {
        setActiveEvents({
                title: '',
                notes: '',
                start: new Date(),
                end: addHours(new Date(), 1),
                bgColor: '#fafafa',
                user: {
                    uid: '123',
                    name: 'Cristobal'
                }
            })
        toggleDateModal();
    };

    return (
        <button className="btn btn-primary fab"
            onClick={handleClick}>
            <i className="fa fa-plus"></i>
        </button>
    )
}
