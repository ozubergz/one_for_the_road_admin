import ItemList from './list';
import ItemCreate from './create';
import ItemEdit from './edit';

export const Items = {
    list: ItemList,
    create: ItemCreate,
    edit: ItemEdit
}

// import { Button } from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircle';


// let state = {
//     toggleForm: false
// }

// const handleToggle = e => {
//     state.toggleForm = !state.toggleForm;
// }

// const AddButton = () => {
//     return (
//         <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleToggle}
//             startIcon={<AddCircleIcon />}
//         >
//             Add Options
//         </Button>
//     );
// }

// export const ItemEdit = props => (
//     <Edit {...props}>
//         <SimpleForm>
//             <TextInput disabled source="id" />
//             <TextInput source="name" />
//             <TextInput source="description" />
//             <NumberInput source="price" step={1} format={price => price.toFixed(2)} />
//             <ReferenceInput source="category_id" reference="categories">
//                 <SelectInput optionText="name" />
//             </ReferenceInput>
//             {/* <AddButton /> */}
//         </SimpleForm>
//     </Edit>
// );
