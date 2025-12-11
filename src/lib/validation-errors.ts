// Helper to parse validation errors from backend
export interface ValidationErrors {
    [field: string]: string[];
}

export function parseValidationErrors(error: any): ValidationErrors | null {
    // ASP.NET Core returns validation errors in different possible locations

    // Try response.data first (most common)
    let data = error?.response?.data;

    // If response.data is a string, try parsing it
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch {
            return null;
        }
    }

    if (!data || typeof data !== 'object') {
        return null;
    }

    // Check if it's a validation error object
    // ASP.NET Core validation errors have field names as keys with string array values
    const hasArrayValues = Object.keys(data).some(key => Array.isArray(data[key]));

    if (hasArrayValues) {
        return data as ValidationErrors;
    }

    // Check for errors property (some frameworks wrap it)
    if (data.errors && typeof data.errors === 'object') {
        const hasErrorArrayValues = Object.keys(data.errors).some(key =>
            Array.isArray(data.errors[key])
        );

        if (hasErrorArrayValues) {
            return data.errors as ValidationErrors;
        }
    }

    return null;
}

export function getFieldError(
    validationErrors: ValidationErrors | null,
    fieldName: string
): string | null {
    if (!validationErrors) return null;

    // Try exact match first
    if (validationErrors[fieldName]) {
        return validationErrors[fieldName][0]; // Return first error
    }

    // Try case-insensitive match
    const lowerFieldName = fieldName.toLowerCase();
    const matchingKey = Object.keys(validationErrors).find(
        (key) => key.toLowerCase() === lowerFieldName
    );

    if (matchingKey && validationErrors[matchingKey]) {
        return validationErrors[matchingKey][0];
    }

    return null;
}

export function getAllErrorMessages(validationErrors: ValidationErrors | null): string[] {
    if (!validationErrors) return [];

    const messages: string[] = [];
    Object.entries(validationErrors).forEach(([field, errors]) => {
        errors.forEach((error) => {
            messages.push(`${field}: ${error}`);
        });
    });

    return messages;
}
