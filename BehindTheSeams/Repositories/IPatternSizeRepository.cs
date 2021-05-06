using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IPatternSizeRepository
    {
        void Add(PatternSize patternSize);
        List<PatternSize> GetByPatternId(int id);
    }
}