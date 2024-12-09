import applyDHondt from '../src/services/elections';

describe('DHondt Service Tests', () => {
  it('debería calcular correctamente la distribución de escaños', () => {
    const partiesData = [
      { list: "1", votes: 340000 },
      { list: "2", votes: 280000 },
      { list: "3", votes: 160000 }
    ];
    
    const totalSeats = 7;
    
    const result = applyDHondt(partiesData, totalSeats);
    
    expect(result).toEqual([
      { list: "1", seats: 3 },
      { list: "2", seats: 3 },
      { list: "3", seats: 1 }
    ]);
  });

  it('debería manejar el caso de votos iguales', () => {
    const partiesData = [
      { list: "1", votes: 100 },
      { list: "2", votes: 100 }
    ];
    
    const totalSeats = 2;
    
    const result = applyDHondt(partiesData, totalSeats);
    
    expect(result[0].seats + result[1].seats).toBe(totalSeats);
  });

  it('debería lanzar error con datos inválidos', () => {
    expect(() => {
      applyDHondt([], -1);
    }).toThrow('Invalid input');
  });
});