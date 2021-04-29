using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IRetailerRepository
    {
        List<Retailer> GetAll();
        Retailer GetById(int id);
    }
}