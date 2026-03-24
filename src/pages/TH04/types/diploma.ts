export interface Diploma {
	id: number;

	bookId: number;
	decisionId: number;

	serialNumber: number;
	diplomaCode: string;

	studentId: string;
	name: string;
	dob: string;

	extraFields: Record<string, any>;
}
