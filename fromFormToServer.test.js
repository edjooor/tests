const fromFormToServer = personInForm => ({
    type: [
        personInForm.isForeign ? null : 'foreign',
        personInForm.isJuridical ? 'juridical' : 'physical',
    ].filter(Boolean).join(' '),
    tin: personInForm.isForeign ? null : personInForm.tin,
    foreign_tin: personInForm.isForeign ? personInForm.tin : null,
    name: personInForm.isJuridical ? null : personInForm.title,
    company_title: personInForm.isJuridical ? personInForm.title : null,
});


describe('fromFormToServer', () => {
    test('отечественное физическое лицо', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: false,
            tin: '1234567890',
            title: 'Ivan Petrov',
        };
        expect(fromFormToServer(personInForm)).toEqual({
            type: 'physical',
            tin: '1234567890',
            foreign_tin: null,
            name: 'Ivan Petrov',
            company_title: null,
        });
    });

    test('отечественное юридическое лицо', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: true,
            tin: '0987654321',
            title: 'Local Corp',
        };
        expect(fromFormToServer(personInForm)).toEqual({
            type: 'juridical',
            tin: '0987654321',
            foreign_tin: null,
            name: null,
            company_title: 'Local Corp',
        });
    });

    test('иностранное физическое лицо', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: false,
            tin: '9876543210',
            title: 'Bob Error',
        };
        expect(fromFormToServer(personInForm)).toEqual({
            type: 'foreign_physical',
            tin: null,
            foreign_tin: '9876543210',
            name: 'Bob Error',
            company_title: null,
        });
    });

    test('иностранное юридическое лицо', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: true,
            tin: '0123456789',
            title: 'Global Corp',
        };
        expect(fromFormToServer(personInForm)).toEqual({
            type: 'foreign_juridical',
            tin: null,
            foreign_tin: '0123456789',
            name: null,
            company_title: 'Global Corp',
        });
    });

    test('пустые поля', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: false,
            tin: null,
            title: null,
        };
        expect(fromFormToServer(personInForm)).toEqual({
            type: 'physical',
            tin: null,
            foreign_tin: null,
            name: null,
            company_title: null,
        });
    });
});
