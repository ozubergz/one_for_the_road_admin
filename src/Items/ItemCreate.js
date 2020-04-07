import React from 'react';
import {
    Button,
    Toolbar,
    SaveButton,
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required,
    number,
    minValue
} from 'react-admin';

const ToolbarCreate = ({onCancel, ...props}) => (
    <Toolbar {...props} >
        <SaveButton />
        <Button label="cancel" onClick={onCancel} />
    </Toolbar>
);

const ItemCreate = (props) => (
    <Create title=" " {...props}>
        <SimpleForm 
            variant="standard" 
            redirect="show"
            toolbar={<ToolbarCreate onCancel={props.onCancel} {...props}/>}
        >
            <TextInput source="name" validate={required()} />
            <TextInput source="description" validate={required()} />
            <NumberInput 
                source="price" 
                validate={[required(), number(), minValue(0)]}
            />
            <ReferenceInput 
                source="category_id" 
                reference="categories"
                validate={required()}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default ItemCreate;