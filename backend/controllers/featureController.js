// Example Features for Users and Admins

// Feature 1 (User + Admin)
exports.featureOne = (req, res) => {
    res.json({ message: "Feature One (User and Admin)" });
};

// Feature 2 (User + Admin)
exports.featureTwo = (req, res) => {
    res.json({ message: "Feature Two (User and Admin)" });
};

// Feature 3 (Admin Only)
exports.adminFeatureOne = (req, res) => {
    res.json({ message: "Admin Feature One (Admin Only)" });
};

// Feature 4 (Admin Only)
exports.adminFeatureTwo = (req, res) => {
    res.json({ message: "Admin Feature Two (Admin Only)" });
};
