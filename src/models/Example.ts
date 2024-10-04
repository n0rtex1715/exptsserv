import moment from "moment";

const INVALID_CONSTRUCTION_PARAM = 'nameOrObj arg must be a string or an object ' + 'with the appropriate example keys.';

export type ExampleType = {
    id: number;
    name: string;
}

// Create new example
function new_(
    name?: string,
    id?: number,
): ExampleType {
    return {
        id: (id ?? -1),
        name: (name ?? '')
    }
}

// Get example instance from object
function from (param: object): ExampleType {
    if (isExample(param)) {
        return new_(param.name, param.id);
    }
    throw new Error(INVALID_CONSTRUCTION_PARAM);
}

// Check if arg meets criteria to be example
function isExample(arg: unknown): arg is ExampleType {
    return (
        !!arg && typeof arg === 'object' &&
        'id' in arg && typeof arg.id === 'number' &&
        'name' in arg && typeof arg.name === 'string'
    );
}

export default {
    new: new_,
    from, isExample,
} as const;